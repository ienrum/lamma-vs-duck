import { Direction } from "../../cross-pad/model/types";
import { ReservedAnimalMapsHistory } from "./reserved-animal-maps";
import { BoardType, ReservedAnimalList } from "./types";


/**
 * 게임 보드의 스냅샷을 관리하는 클래스
 */
export class BoardHistory {
  private history: BoardType[];
  private reservedAnimalMapsHistory: ReservedAnimalMapsHistory;

  /**
   * 게임 스냅샷 초기화
   * @param gameSnapshot 초기 게임 보드
   * @param reservedAnimalMaps 예약된 동물 맵
   */
  constructor(gameSnapshot: BoardType, reservedAnimalMaps: ReservedAnimalMapsHistory) {
    this.history = [this.copyBoard(gameSnapshot)];
    this.reservedAnimalMapsHistory = reservedAnimalMaps;
  }

  /**
   * 보드 history 상태 업데이트
   * @param history 업데이트할 보드 history 상태  
   * @param reservedAnimalMaps 업데이트할 예약된 동물 맵 상태
   */
  public updateBoard(history: BoardType[], reservedAnimalMaps: any): void {
    this.history = history;
    this.reservedAnimalMapsHistory.updateReservedAnimalMaps(reservedAnimalMaps);
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
    return this.reservedAnimalMapsHistory.getCountSnapshot(direction);
  }

  /**
   * 특정 방향의 최대 카운트 반환
   * @param direction 방향
   */
  public getMaxCount(direction: Direction): number {
    return this.reservedAnimalMapsHistory.getAnimalMapsLength(direction);
  }

  /**
   * 이전 게임 상태로 되돌림
   */
  public backwardGame(): BoardType | undefined {
    if (this.history.length === 0) {
      console.warn('게임 스냅샷이 없습니다.');
      return undefined;
    }

    this.reservedAnimalMapsHistory.backwardSnapshot();
    return this.history.pop();
  }

  /**
   * 다음 게임 상태로 진행
   * @param board 현재 보드
   * @param direction 방향
   */
  public forwardGame(board: BoardType, direction: Direction): void {
    this.history.push(this.copyBoard(board));
    this.reservedAnimalMapsHistory.forwardSnapshot(direction);
  }

  /**
   * 특정 방향의 예약된 동물 맵 반환
   * @param direction 방향
   */
  public getReservedAnimalMaps(direction: Direction): ReservedAnimalList {
    const currentIndex = this.getCurrentIndex(direction);
    return this.reservedAnimalMapsHistory.getAnimalMaps(direction)[currentIndex];
  }

  /**
   * 현재 인덱스 계산
   * @param direction 방향
   */
  private getCurrentIndex(direction: Direction): number {
    const currentIndex = this.reservedAnimalMapsHistory.getCountSnapshot(direction);
    const maxLength = this.reservedAnimalMapsHistory.getAnimalMapsLength(direction);

    return currentIndex >= maxLength ? maxLength - 1 : currentIndex;
  }

  /**
   * 마지막 인덱스 여부 확인
   * @param direction 방향
   */
  public isLastIndex(direction: Direction): boolean {
    const count = this.reservedAnimalMapsHistory.getCountSnapshot(direction);
    const maxLength = this.reservedAnimalMapsHistory.getAnimalMapsLength(direction);

    return count === maxLength;
  }
}