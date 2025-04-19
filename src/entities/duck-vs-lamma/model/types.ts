import { BoardCell } from "./constants";
import { BoardHistory } from "./board-history";
import { Direction } from "../../cross-pad/model/types";


export type BoardType = BoardCell[][];
export type ReservedAnimalList = BoardCell[];
export type ReservedAnimalListHistory = ReservedAnimalList[];

/**
 * ReservedAnimalMapsHistory 클래스의 상태만을 담는 타입
 */
export interface ReservedAnimalMapsHistoryState {
  reservedAnimalMaps: Record<Direction, ReservedAnimalListHistory>;
  countSnapshot: Record<Direction, number>;
  indexSnapshot: [Direction, number][];
}

export interface BoardHistoryState {
  history: BoardType[];
  reservedAnimalMapsHistory: ReservedAnimalMapsHistoryState;
}

export interface BoardState {
  board: BoardType;
  boardSize: number;
  boardHistory: BoardHistory;
  whoIsWin: string;
}

export interface BoardStateUpdate {
  board?: BoardType;
  boardSize?: number;
  boardHistory?: BoardHistoryState;
  whoIsWin?: string;
}
