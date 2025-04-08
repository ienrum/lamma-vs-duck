'use client'

import { animalCells, BoardCell, boardCellEmoji, switchCells } from "./constants";
import { Direction } from "../../cross-pad/model/types";
import { BoardHistory } from "./board-history";
import { ReservedAnimalMaps } from "./reserved-animal-maps";
import { BoardState, BoardStateUpdate, BoardType } from "./types";

/**
 * 게임 보드를 관리하는 클래스
 */
export class Board {
  private state: BoardState;
  private startDate: Date;
  private endDate?: Date;

  /**
   * 게임 보드 초기화
   * @param board 초기 보드 문자열 배열
   * @param reservedAnimalMaps 예약된 동물 맵
   */
  constructor(board: string[][], reservedAnimalMaps: Record<Direction, string[][]>) {
    this.startDate = new Date();
    const initialBoard = this.initializeBoard(board);
    const animalBoard = initialBoard
    const animalCellBoardSize = animalBoard.length;

    const reservedAnimalMapsHistory = new ReservedAnimalMaps(reservedAnimalMaps);
    const animalBoardHistory = new BoardHistory(this.copyBoard(animalBoard), reservedAnimalMapsHistory);

    this.state = {
      board: initialBoard,
      animalBoard,
      animalCellBoardSize,
      animalBoardHistory
    };
  }

  /**
   * 상태 업데이트
   * @param update 업데이트할 상태
   */
  private updateState(update: BoardStateUpdate): void {
    this.state = { ...this.state, ...update };
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
    return this.state.animalBoardHistory.getReservedAnimalMaps(direction)
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

    this.state.animalBoardHistory.forwardGame(this.copyBoard(newAnimalBoard), direction);

    this.updateState({
      animalBoard: newAnimalBoard,
      board: newAnimalBoard
    });

    if (this.isWon()) {
      this.endDate = new Date();
    }
  }

  /**
   * 동물 셀을 수평 방향으로 이동
   * @param direction 이동 방향 (left 또는 right)
   * @param reservedAnimals 예약된 동물 셀
   */
  private moveHorizontal(direction: "left" | "right", reservedAnimals: BoardCell[]): BoardType {
    const isLeft = direction === "left";
    const startIndex = isLeft ? 1 : 0;
    const endIndex = isLeft ? this.state.animalCellBoardSize : this.state.animalCellBoardSize - 1;

    return this.state.animalBoard.map((row, index) => {
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
    const endIndex = isUp ? this.state.animalCellBoardSize : this.state.animalCellBoardSize - 1;

    const movingRows = this.state.animalBoard.slice(startIndex, endIndex);
    return isUp
      ? [...movingRows, reservedAnimals]
      : [reservedAnimals, ...movingRows];
  }

  /**
   * 게임 상태를 뒤로 돌리는 메서드
   */
  public backwardGame(): void {
    if (!this.state.animalBoardHistory) {
      console.warn('게임 스냅샷이 없습니다.');
      return;
    }

    const snapshot = this.state.animalBoardHistory.getHistory();
    if (snapshot.length > 1) {
      this.state.animalBoardHistory.backwardGame();
    }

    const lastSnapshot = this.state.animalBoardHistory.getHistory()[this.state.animalBoardHistory.getHistory().length - 1];
    this.updateState({
      animalBoard: lastSnapshot,
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
    const reservedAnimals = this.state.animalBoardHistory.getReservedAnimalMaps(direction);
    return reservedAnimals.map((cell: BoardCell) => cell);
  }

  /**
   * 게임 종료 여부 확인
   */
  private isExceeded(): boolean {
    const directions: Direction[] = ['up', 'down', 'left', 'right'];
    return directions.some((direction) => this.state.animalBoardHistory.isLastIndex(direction));
  }

  /**
   * 특정 방향의 현재 카운트 반환
   * @param direction 방향
   */
  public getCount(direction: Direction): number {
    return this.state.animalBoardHistory.getCount(direction);
  }

  /**
   * 특정 방향의 최대 카운트 반환
   * @param direction 방향
   */
  public getMaxCount(direction: Direction): number {
    return this.state.animalBoardHistory.getMaxCount(direction);
  }

  /**
   * 게임 시작 시간 반환
   */
  public getStartDate(): Date {
    return this.startDate;
  }

  /**
   * 게임 종료 시간 반환
   */
  public getEndDate(): Date | undefined {
    return this.endDate;
  }

  /**
   * 게임 종료여부
   */
  public isWon(): boolean {
    const duckCellCount = this.state.animalBoard.reduce((acc, row) => {
      return acc + row.filter((cell) => cell === BoardCell.Duck).length;
    }, 0);

    const lammaCellCount = this.state.animalBoard.reduce((acc, row) => {
      return acc + row.filter((cell) => cell === BoardCell.Lamma).length;
    }, 0);

    return duckCellCount === lammaCellCount;
  }

  /**
   * 라마 혹은 오리 셀 카운트 반환
   */
  public getAnimalCellCount(animal: BoardCell): number {
    return this.state.animalBoard.reduce((acc, row) => {
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