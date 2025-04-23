import React from 'react';
import ReservedAnimalCells from './reserved-animall-cells';
import GameScoreBox from './game-score-box';
import GameBoard from './game-board';
import { Direction } from '@/src/entities/cross-pad/model/types';
import useGlitch from '@/src/shared/hook/use-glitch';
import { useBackButtonStore } from '@/src/entities/back-button/model/store';
interface GameBoardLayoutProps {
  currentEmojiBoard: string[][];
  gameInfo: {
    playTime: () => number;
    lammaCount: () => number;
    duckCount: () => number;
    count: (direction: Direction) => number;
    maxCount: (direction: Direction) => number;
    whoIsWin: () => string;
  };
  reservedAnimalMaps: (direction: Direction) => string[];
}

export const GameBoardLayout: React.FC<GameBoardLayoutProps> = ({
  currentEmojiBoard,
  gameInfo,
  reservedAnimalMaps,
}) => {
  const { backwardClickedId } = useBackButtonStore();
  const { glitchRef } = useGlitch([backwardClickedId]);

  return (
    <div ref={glitchRef}>
      <GameScoreBox gameInfo={gameInfo} />
      <span className="my-4 h-[1px] w-full bg-gray-300" />
      <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps('down')} direction="down" />
      <div className="flex gap-2">
        <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps('right')} direction="right" />
        <GameBoard currentEmojiBoard={currentEmojiBoard} />
        <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps('left')} direction="left" />
      </div>
      <ReservedAnimalCells reservedAnimalList={reservedAnimalMaps('up')} direction="up" />
    </div>
  );
};
