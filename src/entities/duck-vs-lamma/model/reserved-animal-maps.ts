import { Direction } from "../../cross-pad/model/types";
import { BoardCell } from "./constants";
import { ReservedAnimalList, ReservedAnimalListHistory } from "./types";
/**
 * 예약된 동물 맵을 관리하는 클래스 
 */
export class ReservedAnimalMapsHistory {
  private reservedAnimalMaps: Record<Direction, ReservedAnimalListHistory>;
  private countSnapshot: Record<Direction, number>;
  private indexSnapshot: [Direction, number][];

  /**
   * 예약된 동물 맵 초기화
   * @param reservedAnimalMaps 각 방향별 예약된 동물 맵
   */
  constructor(reservedAnimalMaps: Record<Direction, string[][]>) {
    this.reservedAnimalMaps = this.initializeReservedAnimalMaps(reservedAnimalMaps);
    this.indexSnapshot = [];
    this.countSnapshot = this.initializeCountSnapshot();
  }

  public updateReservedAnimalMaps(reservedAnimalMaps: any): void {
    this.reservedAnimalMaps = reservedAnimalMaps.reservedAnimalMaps;
    this.indexSnapshot = reservedAnimalMaps.indexSnapshot;
    this.countSnapshot = reservedAnimalMaps.countSnapshot;
  }

  private initializeReservedAnimalMaps(reservedAnimalMaps: Record<Direction, string[][]>): Record<Direction, ReservedAnimalListHistory> {
    return (Object.keys(reservedAnimalMaps) as Direction[]).reduce((acc, direction) => {
      acc[direction] = reservedAnimalMaps[direction].map(cell => cell.map(cell => cell as BoardCell));
      return acc;
    }, {} as Record<Direction, ReservedAnimalListHistory>);
  }

  /**
   * 각 방향별 카운트 스냅샷 초기화
   */
  private initializeCountSnapshot(): Record<Direction, number> {
    return (Object.keys(this.reservedAnimalMaps) as Direction[]).reduce(
      (acc, direction) => {
        acc[direction] = 0;
        return acc;
      },
      {} as Record<Direction, number>
    );
  }

  /**
   * 특정 방향의 동물 맵 반환
   * @param direction 방향
   */
  public getAnimalMaps(direction: Direction): ReservedAnimalListHistory {
    return this.reservedAnimalMaps[direction];
  }

  /**
   * 현재 스냅샷 상태 반환
   */
  public getSnapshot(): [Direction, number][] {
    return [...this.indexSnapshot];
  }

  /**
   * 이전 스냅샷으로 되돌림
   */
  public backwardSnapshot(): ReservedAnimalList {
    if (this.indexSnapshot.length === 0) {
      console.warn('스냅샷이 없습니다.');
      return [];
    }

    const [direction, index] = this.indexSnapshot.pop()!;
    this.countSnapshot[direction] -= 1;
    return this.reservedAnimalMaps[direction][index];
  }

  /**
   * 다음 스냅샷으로 진행
   * @param direction 방향
   */
  public forwardSnapshot(direction: Direction): void {
    const lastIndex = this.getCountSnapshot(direction);
    this.indexSnapshot.push([direction, lastIndex + 1]);
    this.countSnapshot[direction] += 1;
  }

  /**
   * 특정 방향의 현재 카운트 반환
   * @param direction 방향
   */
  public getCountSnapshot(direction: Direction): number {
    return this.countSnapshot[direction];
  }

  /**
   * 특정 방향의 최대 카운트 반환
   * @param direction 방향
   */
  public getAnimalMapsLength(direction: Direction): number {
    return this.reservedAnimalMaps[direction].length;
  }
}
