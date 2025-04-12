import { Direction } from "../../cross-pad/model/types";
import { ReservedAnimalMaps } from "./reserved-animal-maps";
import { BoardType, ReservedAnimalList } from "./types";


/**
 * 게임 보드의 스냅샷을 관리하는 클래스
 */
export class BoardHistory {
  private history: BoardType[];
  private reservedAnimalMaps: ReservedAnimalMaps;
  private N: number;

  /**
   * 게임 스냅샷 초기화
   * @param gameSnapshot 초기 게임 보드
   * @param reservedAnimalMaps 예약된 동물 맵
   */
  constructor(gameSnapshot: BoardType, reservedAnimalMaps: ReservedAnimalMaps) {
    this.history = [this.copyBoard(gameSnapshot)];
    this.reservedAnimalMaps = reservedAnimalMaps;
    this.N = gameSnapshot.length;
  }

  /**
   * 보드 복사
   * @param board 복사할 보드
   */
  private copyBoard(board: BoardType): BoardType {
    return board.map(row => [...row]);
  }

  /**
   * 현재 히스토리 반환
   */
  public getHistory(): BoardType[] {
    return [...this.history];
  }

  /**
   * 특정 방향의 현재 카운트 반환
   * @param direction 방향
   */
  public getCount(direction: Direction): number {
    return this.reservedAnimalMaps.getCountSnapshot(direction);
  }

  /**
   * 특정 방향의 최대 카운트 반환
   * @param direction 방향
   */
  public getMaxCount(direction: Direction): number {
    return this.reservedAnimalMaps.getAnimalMapsLength(direction);
  }

  /**
   * 이전 게임 상태로 되돌림
   */
  public backwardGame(): BoardType | undefined {
    if (this.history.length === 0) {
      console.warn('게임 스냅샷이 없습니다.');
      return undefined;
    }

    this.reservedAnimalMaps.backwardSnapshot();
    return this.history.pop();
  }

  /**
   * 다음 게임 상태로 진행
   * @param board 현재 보드
   * @param direction 방향
   */
  public forwardGame(board: BoardType, direction: Direction): void {
    this.history.push(this.copyBoard(board));
    this.reservedAnimalMaps.forwardSnapshot(direction);
  }

  /**
   * 특정 방향의 예약된 동물 맵 반환
   * @param direction 방향
   */
  public getReservedAnimalMaps(direction: Direction): ReservedAnimalList {
    const currentIndex = this.getCurrentIndex(direction);
    const maxLength = this.reservedAnimalMaps.getAnimalMapsLength(direction);

    if (currentIndex >= maxLength) {
      return new Array(this.N).fill("0");
    }

    return this.reservedAnimalMaps.getAnimalMaps(direction)[currentIndex] ?? new Array(this.N).fill("0");
  }

  /**
   * 현재 인덱스 계산
   * @param direction 방향
   */
  private getCurrentIndex(direction: Direction): number {
    const currentIndex = this.reservedAnimalMaps.getCountSnapshot(direction);

    return currentIndex;
  }

  /**
   * 마지막 인덱스 여부 확인
   * @param direction 방향
   */
  public isLastIndex(direction: Direction): boolean {
    const count = this.reservedAnimalMaps.getCountSnapshot(direction);
    const maxLength = this.reservedAnimalMaps.getAnimalMapsLength(direction);

    return count === maxLength;
  }

  /**
   * 히스토리 초기화
   */
  public clearHistory(): void {
    this.history = [];
  }
}