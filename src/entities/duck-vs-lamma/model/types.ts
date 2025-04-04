import { BoardCell } from "./constants";
import { BoardHistory } from "./board-history";

export type BoardType = BoardCell[][];
export type ReservedAnimalList = BoardCell[];
export type ReservedAnimalListHistory = ReservedAnimalList[];

export interface BoardState {
  board: BoardType;
  animalBoard: BoardType;
  animalCellBoardSize: number;
  switchBoard: BoardType;
  animalBoardHistory: BoardHistory;
}

export interface BoardStateUpdate {
  board?: BoardType;
  animalBoard?: BoardType;
  animalCellBoardSize?: number;
  switchBoard?: BoardType;
  animalBoardHistory?: BoardHistory;
}