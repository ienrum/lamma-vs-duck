import { cn } from "@/lib/utils";
import { Direction } from "@/src/entities/cross-pad/model/types";

interface GameInfo {
  count: (direction: Direction) => number;
  maxCount: (direction: Direction) => number;
}

const GameScoreBox = ({ gameInfo }: { gameInfo: GameInfo }) => {
  return (
    <div className="flex items-center gap-4 justify-center">
      {["down", "right", "left", "up"].map((direction) => (
        <label key={direction} className={cn("text-sm font-sans", {
          "text-red-500": gameInfo.count(direction as Direction) === gameInfo.maxCount(direction as Direction)
        })}>
          {direction} : {gameInfo.count(direction as Direction)} / {gameInfo.maxCount(direction as Direction)}
        </label>
      ))}
    </div>
  )
}

export default GameScoreBox;