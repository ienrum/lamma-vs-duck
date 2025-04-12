import { create } from 'zustand';
import { Board } from "@/src/entities/duck-vs-lamma/model/board";
import { Direction } from "@/src/entities/cross-pad/model/types";
import { BoardCell } from "@/src/entities/duck-vs-lamma/model/constants";


interface GameState {
  board: Board | null;
  currentEmojiBoard: string[][] | null;
  setBoard: (initialBoard: string[][], initialReservedAnimalMaps: Record<Direction, string[][]>) => void;
  moveAnimalCells: (direction: Direction) => void;
  backwardGame: () => void;
  getReservedAnimalMaps: (direction: Direction) => string[];
  getCount: (direction: Direction) => number;
  getMaxCount: (direction: Direction) => number;
  getPlayTime: () => number;
  isWon: () => boolean;
  getLammaCount: () => number;
  getDuckCount: () => number;
  clearBoard: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  board: null,
  currentEmojiBoard: null,
  setBoard: (initialBoard: string[][], initialReservedAnimalMaps: Record<Direction, string[][]>) => {
    const board = new Board(initialBoard, initialReservedAnimalMaps);
    set({ board, currentEmojiBoard: board.getEmojiBoard() });
  },
  moveAnimalCells: (direction: Direction) => {
    const { board } = get();
    if (!board) return;
    board.moveAnimalCells(direction);
    set({ currentEmojiBoard: board.getEmojiBoard() });
  },

  backwardGame: () => {
    const { board } = get();
    if (!board) return;
    board.backwardGame();
    set({ currentEmojiBoard: board.getEmojiBoard() });
  },

  getReservedAnimalMaps: (direction: Direction) => {
    const { board } = get();
    if (!board) return [];
    return board.getEmojiReservedAnimalMaps(direction);
  },

  getCount: (direction: Direction) => {
    const { board } = get();
    if (!board) return 0;
    return board.getCount(direction);
  },

  getMaxCount: (direction: Direction) => {
    const { board } = get();
    if (!board) return 0;
    return board.getMaxCount(direction);
  },

  getPlayTime: () => {
    const { board } = get();
    if (!board) return 0;
    if (board.getEndDate()) {
      return board.getEndDate()!.getTime() - board.getStartDate().getTime();
    }

    return new Date().getTime() - board.getStartDate().getTime();
  },

  isWon: () => {
    const { board } = get();
    if (!board) return false;
    return board.isWon();
  },

  getLammaCount: () => {
    const { board } = get();
    if (!board) return 0;
    return board.getAnimalCellCount(BoardCell.Lamma);
  },

  getDuckCount: () => {
    const { board } = get();
    if (!board) return 0;
    return board.getAnimalCellCount(BoardCell.Duck);
  },

  clearBoard: () => {
    const { board } = get();
    if (!board) return;
    board.clearBoard();
  },
})); 