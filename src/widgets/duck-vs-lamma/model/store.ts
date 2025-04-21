import { create } from 'zustand';
import { Board } from '@/src/entities/duck-vs-lamma/model/board';
import { Direction } from '@/src/entities/cross-pad/model/types';
import { BoardCell } from '@/src/entities/duck-vs-lamma/model/constants';
import { BoardState, BoardStateUpdate } from '@/src/entities/duck-vs-lamma/model/types';

interface GameState {
  startTime: Date | null;
  endTime: Date | null;
  playTimeOffset: number;

  score: number;

  board: Board | null;
  currentEmojiBoard: string[][] | null;
  initGame: (
    initialBoard: string[][],
    initialReservedAnimalMaps: Record<Direction, string[][]>,
    whoIsWin: string,
    playTimeOffset?: number,
    boardState?: BoardStateUpdate
  ) => void;
  moveAnimalCells: (direction: Direction) => void;
  backwardGame: () => void;
  getReservedAnimalMaps: (direction: Direction) => string[];
  getCount: (direction: Direction) => number;
  getMaxCount: (direction: Direction) => number;
  getPlayTime: () => number;
  isWon: () => boolean;
  getLammaCount: () => number;
  getDuckCount: () => number;
  endGame: (endTime: Date) => void;
  getBoardState: () => BoardStateUpdate | null;
}

export const useGameStore = create<GameState>((set, get) => ({
  startTime: null,
  endTime: null,
  playTimeOffset: 0,
  score: 0,
  board: null,
  currentEmojiBoard: null,
  initGame: (
    initialBoard: string[][],
    initialReservedAnimalMaps: Record<Direction, string[][]>,
    whoIsWin: string,
    playTimeOffset?: number,
    boardState?: BoardStateUpdate
  ) => {
    const startTime = new Date();
    set({ startTime });

    const board = new Board(initialBoard, initialReservedAnimalMaps, whoIsWin);

    if (playTimeOffset) {
      set({ playTimeOffset });
    }
    if (boardState) {
      board.updateState(boardState);
    }

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
    const { startTime, endTime, playTimeOffset } = get();
    if (!startTime) return 0;
    if (endTime) {
      return endTime.getTime() - startTime.getTime() + playTimeOffset;
    }

    return new Date().getTime() - startTime.getTime() + playTimeOffset;
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

  endGame: (endTime: Date) => {
    const { startTime, playTimeOffset } = get();
    if (!startTime) return;
    const playTime = endTime.getTime() - startTime.getTime() + playTimeOffset;
    set({ endTime, score: playTime });
  },

  getBoardState: () => {
    const { board } = get();
    if (!board) return null;
    return board.getState();
  },
}));
