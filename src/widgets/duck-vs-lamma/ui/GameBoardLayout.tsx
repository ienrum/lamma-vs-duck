import React from 'react';
import ReservedAnimalCells from "./reserved-animall-cells";
import GameScoreBox from "./game-score-box";
import GameBoard from "./game-board";
import { Direction } from "@/src/entities/cross-pad/model/types";
import { BoardCell } from "@/src/entities/duck-vs-lamma/model/constants";

interface GameBoardLayoutProps {
  currentEmojiBoard: string[][];
  gameInfo: {
    playTime: () => number;
    lammaCount: () => number;
    duckCount: () => number;
    count: (direction: Direction) => number;
    maxCount: (direction: Direction) => number;
  };
  reservedAnimalMaps: (direction: Direction) => string[];
}

export const GameBoardLayout: React.FC<GameBoardLayoutProps> = ({
  currentEmojiBoard,
  gameInfo,
  reservedAnimalMaps
}) => {
  return (
    <>
      <GameScoreBox gameInfo={gameInfo} />
      <span className="w-full h-[1px] bg-gray-300 my-4" />
      <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps("down")} direction="down" />
      <div className="flex gap-2">
        <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps("right")} direction="right" />
        <GameBoard currentEmojiBoard={currentEmojiBoard} />
        <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps("left")} direction="left" />
      </div>
      <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps("up")} direction="up" />
    </>
  );
}; 