import { Direction } from '@/src/entities/cross-pad/model/types';
import { BoardCell } from '@/src/entities/duck-vs-lamma/model/constants';

const generateMinimumDirections = (generatedDirectionHistory: Direction[]): Direction[] => {
  const directions = ['up', 'down', 'left', 'right'] as Direction[];
  const minimumCount = directions.reduce((acc, direction) => {
    const count = generatedDirectionHistory.filter((d) => d === direction).length;
    return count < acc ? count : acc;
  }, Infinity);

  return directions.filter(
    (direction) => generatedDirectionHistory.filter((d) => d === direction).length === minimumCount
  );
};

const generateRandomDirection = (generatedDirectionHistory: Direction[]): Direction => {
  const directions = ['up', 'down', 'left', 'right'] as Direction[];
  const randomDirection = directions[Math.floor(Math.random() * 4)];
  const minimumDirections = generateMinimumDirections(generatedDirectionHistory);
  if (randomDirection && !minimumDirections.includes(randomDirection)) {
    return generateRandomDirection(generatedDirectionHistory);
  }
  generatedDirectionHistory.push(randomDirection);
  return randomDirection;
};

const moveBoard = (board: string[][], direction: Direction, reservedList: BoardCell[]) => {
  const newBoard = board.map((row) => [...row]);
  const newReservedList = [...reservedList];
  let popedList: BoardCell[] = [];

  if (direction === 'up') {
    popedList = newBoard.shift() as BoardCell[];
    newBoard.push(newReservedList);
  } else if (direction === 'down') {
    popedList = newBoard.pop() as BoardCell[];
    newBoard.unshift(newReservedList);
  } else if (direction === 'left') {
    newBoard.forEach((row) => popedList.push(row.shift() as BoardCell));
    newBoard.forEach((row, index) => row.push(newReservedList[index]));
  } else if (direction === 'right') {
    newBoard.forEach((row) => popedList.push(row.pop() as BoardCell));
    newBoard.forEach((row, index) => row.unshift(newReservedList[index]));
  }

  return {
    newBoard,
    popedList,
  };
};

const generateRandomAnimalList = (boardSize: number): BoardCell[] => {
  const reservedAnimalList = ['1', '2', '0'];

  const animalList = Array.from({ length: boardSize }, () => reservedAnimalList[Math.floor(Math.random() * 3)]);
  return animalList as BoardCell[];
};

const generateInitialBoard = (boardSize: number, whoIsWin: 'duck' | 'lamma') => {
  const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(whoIsWin === 'duck' ? '1' : '2'));

  return board;
};

const getOppositeDirection = (direction: Direction): Direction => {
  return {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left',
  }[direction] as Direction;
};

const generateReservedAnimalMaps = (
  board: string[][],
  boardSize: number,
  whoIsWin: 'duck' | 'lamma',
  depth: number
) => {
  let currentBoard = board.map((row) => [...row]);
  const generatedDirectionHistory: Direction[] = [];
  const reservedAnimalMaps = {
    up: [],
    down: [],
    left: [],
    right: [],
  } as Record<Direction, BoardCell[][]>;

  while (depth > 0) {
    const randomDirection = generateRandomDirection(generatedDirectionHistory);
    const randomAnimalList = generateRandomAnimalList(boardSize);
    const { newBoard, popedList } = moveBoard(currentBoard, randomDirection, randomAnimalList);
    currentBoard = newBoard;
    const oppositeDirection = getOppositeDirection(randomDirection);
    reservedAnimalMaps[oppositeDirection].unshift(popedList);
    depth--;
  }

  return {
    board: currentBoard,
    reservedAnimalMaps,
  };
};

export function generateGameData(difficulty: number) {
  const boardSize = 4;
  const whoIsWin = ['lamma', 'duck'][Math.floor(Math.random() * 2)] as 'lamma' | 'duck';
  const board = generateInitialBoard(boardSize, whoIsWin);
  const { board: finalBoard, reservedAnimalMaps } = generateReservedAnimalMaps(board, boardSize, whoIsWin, difficulty);

  return {
    board: finalBoard,
    reservedAnimalMaps,
    whoIsWin,
  };
}
