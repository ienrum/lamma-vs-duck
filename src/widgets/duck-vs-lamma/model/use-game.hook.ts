import { Board } from "@/src/entities/duck-vs-lamma/model/board";
import { useCrossPadStore } from "@/src/entities/cross-pad/model/store";
import { useEffect, useState } from "react";
import { Direction } from "@/src/entities/cross-pad/model/types";
import { BoardCell } from "@/src/entities/duck-vs-lamma/model/constants";

export const useGame = () => {
  const { currentDirection, count } = useCrossPadStore();

  const [board] = useState<Board>(
    new Board([
      ["1", "y", "0", "z", "1"],
      ["z", " ", "x", " ", "z"],
      ["2", "y", "1", "x", "1"],
      ["z", " ", "x", " ", "z"],
      ["1", "z", "1", "y", "1"]],
      {
        up: [["1", "1", "0"], ["1", "2", "2"], ["1", "1", "0"]],
        down: [["1", "1", "0"], ["1", "2", "2"], ["1", "1", "0"]],
        left: [["1", "1", "0"], ["1", "2", "2"], ["1", "1", "0"]],
        right: [["2", "1", "0"], ["1", "2", "2"], ["1", "1", "0"]],
      }
    ));

  const [currentEmojiBoard, setCurrentEmojiBoard] = useState<string[][]>(board.getEmojiBoard())

  useEffect(() => {
    console.log(currentDirection)
    if (currentDirection) {
      board.moveAnimalCells(currentDirection)
      setCurrentEmojiBoard(board.getEmojiBoard())
    }

  }, [currentDirection, count])

  return {
    currentEmojiBoard,
    reservedAnimalMaps: (direction: Direction) => board.getEmojiReservedAnimalMaps(direction),
    backwardGame: () => {
      board.backwardGame();
      setCurrentEmojiBoard(board.getEmojiBoard());
    },
    gameInfo: {
      count: (direction: Direction) => board.getCount(direction),
      maxCount: (direction: Direction) => board.getMaxCount(direction),
      playTime: () => new Date().getTime() - board.getStartDate().getTime(),
      isWon: () => board.isWon(),
      lammaCount: () => board.getAnimalCellCount(BoardCell.Lamma),
      duckCount: () => board.getAnimalCellCount(BoardCell.Duck),

    }
  }
};
