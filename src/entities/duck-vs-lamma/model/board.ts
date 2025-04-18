'use client'

import { BoardCell, boardCellEmoji } from "./constants";
import { Direction } from "../../cross-pad/model/types";
import { BoardHistory } from "./board-history";
import { ReservedAnimalMapsHistory } from "./reserved-animal-maps";
import { BoardState, BoardStateUpdate, BoardType } from "./types";

/**
 * 게임 보드를 관리하는 클래스
 */
export class Board {
  private state: BoardState;

  /**
   * 게임 보드 초기화
   * @param board 초기 보드 문자열 배열
   * @param reservedAnimalMaps 예약된 동물 맵
   */
  constructor(board: string[][], reservedAnimalMaps: Record<Direction, string[][]>) {
    const initialBoard = this.initializeBoard(board);
    const animalCellBoardSize = initialBoard.length;

    const reservedAnimalMapsHistory = new ReservedAnimalMapsHistory(reservedAnimalMaps);
    const animalBoardHistory = new BoardHistory(this.copyBoard(initialBoard), reservedAnimalMapsHistory);

    this.state = {
      board: initialBoard,
      boardSize: animalCellBoardSize,
      boardHistory: animalBoardHistory
    };
  }

  /**
   * 상태 업데이트
   * @param update 업데이트할 상태
   */
  public updateState(update: BoardStateUpdate): void {
    const { boardHistory, ...newState } = update;
    if (boardHistory) {
      this.state.boardHistory.updateBoard(boardHistory.history, boardHistory.reservedAnimalMapsHistory);
    }
    this.state = { ...this.state, ...newState };
  }

  public getState(): BoardStateUpdate {
    return {
      board: this.state.board,
      boardSize: this.state.boardSize,
      boardHistory: this.state.boardHistory.getBoardHistoryState(),
    }
  }

  /**
   * 문자열 배열로부터 보드 초기화
   * @param board 초기 보드 문자열 배열
   */
  private initializeBoard(board: string[][]): BoardType {
    return board.map((row) =>
      row.map((cell) => cell as BoardCell)
    );
  }

  /**
   * 특정 방향의 예약된 동물 맵을 이모지로 변환하여 반환
   * @param direction 방향
   */
  public getEmojiReservedAnimalMaps(direction: Direction): string[] {
    return this.state.boardHistory.getReservedAnimalMaps(direction)
      .map((cell: BoardCell) => boardCellEmoji[cell]);
  }

  /**
   * 동물 셀을 지정된 방향으로 이동
   * @param direction 이동 방향
   */
  public moveAnimalCells(direction: Direction): void {
    if (this.isExceeded()) {
      return;
    }

    const reservedAnimals = this.getReservedAnimalCells(direction);
    let newAnimalBoard: BoardType;

    switch (direction) {
      case "left":
      case "right":
        newAnimalBoard = this.moveHorizontal(direction, reservedAnimals);
        break;
      case "up":
      case "down":
        newAnimalBoard = this.moveVertical(direction, reservedAnimals);
        break;
      default:
        return;
    }

    this.state.boardHistory.forwardGame(this.copyBoard(newAnimalBoard), direction);

    this.updateState({
      board: newAnimalBoard
    });
  }

  /**
   * 동물 셀을 수평 방향으로 이동
   * @param direction 이동 방향 (left 또는 right)
   * @param reservedAnimals 예약된 동물 셀
   */
  private moveHorizontal(direction: "left" | "right", reservedAnimals: BoardCell[]): BoardType {
    const isLeft = direction === "left";
    const startIndex = isLeft ? 1 : 0;
    const endIndex = isLeft ? this.state.boardSize : this.state.boardSize - 1;

    return this.state.board.map((row, index) => {
      const reservedCell = reservedAnimals[index];
      const shiftedRow = row.slice(startIndex, endIndex);

      return isLeft
        ? [...shiftedRow, reservedCell]
        : [reservedCell, ...shiftedRow];
    });
  }

  /**
   * 동물 셀을 수직 방향으로 이동
   * @param direction 이동 방향 (up 또는 down)
   * @param reservedAnimals 예약된 동물 셀
   */
  private moveVertical(direction: "up" | "down", reservedAnimals: BoardCell[]): BoardType {
    const isUp = direction === "up";
    const startIndex = isUp ? 1 : 0;
    const endIndex = isUp ? this.state.boardSize : this.state.boardSize - 1;

    const movingRows = this.state.board.slice(startIndex, endIndex);
    return isUp
      ? [...movingRows, reservedAnimals]
      : [reservedAnimals, ...movingRows];
  }

  /**
   * 게임 상태를 뒤로 돌리는 메서드
   */
  public backwardGame(): void {
    if (!this.state.boardHistory) {
      console.warn('게임 스냅샷이 없습니다.');
      return;
    }

    const snapshot = this.state.boardHistory.getHistory();
    if (snapshot.length > 1) {
      this.state.boardHistory.backwardGame();
    }

    const lastSnapshot = this.state.boardHistory.getHistory()[this.state.boardHistory.getHistory().length - 1];
    this.updateState({
      board: lastSnapshot
    });
  }

  /**
   * 이모지로 변환된 보드 반환
   */
  public getEmojiBoard(): string[][] {
    return this.state.board.map((row) =>
      row.map((cell) => boardCellEmoji[cell])
    );
  }

  /**
   * 특정 방향의 예약된 동물 셀 반환
   * @param direction 방향
   */
  private getReservedAnimalCells(direction: Direction): BoardCell[] {
    const reservedAnimals = this.state.boardHistory.getReservedAnimalMaps(direction);
    return reservedAnimals.map((cell: BoardCell) => cell);
  }

  /**
   * 게임 종료 여부 확인
   */
  private isExceeded(): boolean {
    const directions: Direction[] = ['up', 'down', 'left', 'right'];
    return directions.some((direction) => this.state.boardHistory.isLastIndex(direction));
  }

  /**
   * 특정 방향의 현재 카운트 반환
   * @param direction 방향
   */
  public getCount(direction: Direction): number {
    return this.state.boardHistory.getCount(direction);
  }

  /**
   * 특정 방향의 최대 카운트 반환
   * @param direction 방향
   */
  public getMaxCount(direction: Direction): number {
    return this.state.boardHistory.getMaxCount(direction);
  }

  /**
   * 게임 종료여부
   */
  public isWon(): boolean {
    const duckCellCount = this.state.board.reduce((acc, row) => {
      return acc + row.filter((cell) => cell === BoardCell.Duck).length;
    }, 0);

    const lammaCellCount = this.state.board.reduce((acc, row) => {
      return acc + row.filter((cell) => cell === BoardCell.Lamma).length;
    }, 0);

    const isNotEmpty = duckCellCount > 0 || lammaCellCount > 0;

    return isNotEmpty && duckCellCount === lammaCellCount;
  }

  /**
   * 라마 혹은 오리 셀 카운트 반환
   */
  public getAnimalCellCount(animal: BoardCell): number {
    return this.state.board.reduce((acc, row) => {
      return acc + row.filter((cell) => cell === animal).length;
    }, 0);
  }

  /**
   * 보드 복사
   * @param board 복사할 보드
   */
  private copyBoard(board: BoardType): BoardType {
    return board.map((row) => [...row]);
  }
}