import { create } from 'zustand';
import { Board } from "@/src/entities/duck-vs-lamma/model/board";
import { Direction } from "@/src/entities/cross-pad/model/types";
import { BoardCell } from "@/src/entities/duck-vs-lamma/model/constants";

const initialBoard = new Board([
  ["1", "0", "1"],
  ["2", "1", "1"],
  ["1", "1", "1"]],
  {
    up: [["1", "1", "0"], ["1", "2", "2"], ["1", "1", "0"]],
    down: [["1", "1", "0"], ["1", "2", "2"], ["1", "1", "0"]],
    left: [["1", "1", "0"], ["1", "2", "2"], ["1", "1", "0"]],
    right: [["2", "1", "0"], ["1", "2", "2"], ["1", "1", "0"]],
  }
);

interface GameState {
  board: Board;
  currentEmojiBoard: string[][];
  moveAnimalCells: (direction: Direction) => void;
  backwardGame: () => void;
  getReservedAnimalMaps: (direction: Direction) => string[];
  getCount: (direction: Direction) => number;
  getMaxCount: (direction: Direction) => number;
  getPlayTime: () => number;
  isWon: () => boolean;
  getLammaCount: () => number;
  getDuckCount: () => number;
}

export const useGameStore = create<GameState>((set, get) => ({
  board: initialBoard,
  currentEmojiBoard: initialBoard.getEmojiBoard(),

  moveAnimalCells: (direction: Direction) => {
    const { board } = get();
    board.moveAnimalCells(direction);
    set({ currentEmojiBoard: board.getEmojiBoard() });
  },

  backwardGame: () => {
    const { board } = get();
    board.backwardGame();
    set({ currentEmojiBoard: board.getEmojiBoard() });
  },

  getReservedAnimalMaps: (direction: Direction) => {
    const { board } = get();
    return board.getEmojiReservedAnimalMaps(direction);
  },

  getCount: (direction: Direction) => {
    const { board } = get();
    return board.getCount(direction);
  },

  getMaxCount: (direction: Direction) => {
    const { board } = get();
    return board.getMaxCount(direction);
  },

  getPlayTime: () => {
    const { board } = get();
    return new Date().getTime() - board.getStartDate().getTime();
  },

  isWon: () => {
    const { board } = get();
    return board.isWon();
  },

  getLammaCount: () => {
    const { board } = get();
    return board.getAnimalCellCount(BoardCell.Lamma);
  },

  getDuckCount: () => {
    const { board } = get();
    return board.getAnimalCellCount(BoardCell.Duck);
  },
})); 