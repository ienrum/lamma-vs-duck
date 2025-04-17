import { BoardCell } from "./constants";
import { BoardHistory } from "./board-history";

export type BoardType = BoardCell[][];
export type ReservedAnimalList = BoardCell[];
export type ReservedAnimalListHistory = ReservedAnimalList[];

export interface BoardState {
  board: BoardType;
  boardSize: number;
  boardHistory: BoardHistory;
}

export interface BoardStateUpdate {
  board?: BoardType;
  boardSize?: number;
  boardHistory?: any;
}