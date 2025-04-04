import { cn } from "@/lib/utils";
import { Direction } from "@/src/entities/cross-pad/model/types";
import { boardCellEmoji, BoardCell } from "@/src/entities/duck-vs-lamma/model/constants";
import { useEffect, useState } from "react";

interface GameInfo {
  count: (direction: Direction) => number;
  maxCount: (direction: Direction) => number;
  playTime: () => number;
  lammaCount: () => number;
  duckCount: () => number;
}

const formatTime = (time: number) => {
  const baseTime = time / 1000;
  const seconds = Math.floor(baseTime) % 60;
  const minutes = Math.floor(baseTime / 60);
  return `${minutes}:${seconds}`;
}

const GameScoreBox = ({ gameInfo }: { gameInfo: GameInfo }) => {
  const [playTime, setPlayTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayTime(gameInfo.playTime());
    }, 100);

    return () => clearInterval(interval);
  }, [gameInfo]);

  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      <div className="flex items-center gap-4 justify-center">
        <label className="text-lg font-sans">
          {formatTime(playTime)}
        </label>
        <span className="text-sm font-sans">
          {boardCellEmoji[BoardCell.Lamma]} {gameInfo.lammaCount()} : {boardCellEmoji[BoardCell.Duck]} {gameInfo.duckCount()}
        </span>
      </div>
      <div className="flex items-center gap-4 justify-center">
        {["down", "right", "left", "up"].map((direction) => (
          <label key={direction} className={cn("text-sm font-sans", {
            "text-red-500": gameInfo.count(direction as Direction) === gameInfo.maxCount(direction as Direction)
          })}>
            {direction} : {gameInfo.count(direction as Direction)} / {gameInfo.maxCount(direction as Direction)}
          </label>
        ))}
      </div>
    </div>
  )
}

export default GameScoreBox;