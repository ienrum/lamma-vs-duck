import { cn } from '@/lib/utils';
import { Direction } from '@/src/entities/cross-pad/model/types';
import { boardCellEmoji, BoardCell } from '@/src/entities/duck-vs-lamma/model/constants';
import formatTime from '@/src/shared/util/format-time';
import { useEffect, useState } from 'react';

interface GameInfo {
  count: (direction: Direction) => number;
  maxCount: (direction: Direction) => number;
  playTime: () => number;
  lammaCount: () => number;
  duckCount: () => number;
  whoIsWin: () => string;
}

const GameScoreBox = ({ gameInfo }: { gameInfo: GameInfo }) => {
  const [playTime, setPlayTime] = useState(0);

  const winnerEmoji = {
    lamma: boardCellEmoji[BoardCell.Lamma],
    duck: boardCellEmoji[BoardCell.Duck],
  }[gameInfo.whoIsWin()];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayTime(gameInfo.playTime());
    }, 100);

    return () => clearInterval(interval);
  }, [gameInfo]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center gap-4">
        <label className="flex flex-col items-center gap-2 font-sans text-lg">
          <span className="text-2xl font-bold text-amber-600">Winner : {winnerEmoji}</span>
          <span className="font-sans text-sm">{formatTime(playTime)}</span>
        </label>
      </div>
      <div className="flex items-center justify-center gap-4">
        {['down', 'right', 'left', 'up'].map((direction) => (
          <label
            key={direction}
            className={cn('font-sans text-sm', {
              'text-red-500': gameInfo.count(direction as Direction) === gameInfo.maxCount(direction as Direction),
            })}
          >
            {direction} : {gameInfo.count(direction as Direction)} / {gameInfo.maxCount(direction as Direction)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default GameScoreBox;
