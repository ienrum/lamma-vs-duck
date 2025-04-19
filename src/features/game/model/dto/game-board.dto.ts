import { Direction } from "@/src/entities/cross-pad/model/types";

export interface GameBoardRequestDto {
  gameId: string;
  userId: string;
}

export interface GameBoardResponseDto {
  board: string[][];
  reservedAnimalMaps: Record<Direction, string[][]>;
  whoIsWin: string;
}