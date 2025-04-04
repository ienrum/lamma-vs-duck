import { Direction } from "@/src/entities/cross-pad/model/types";
import { animalEmojiCells } from "@/src/entities/duck-vs-lamma/model/constants";
import Cell from "./cell";
import { cn } from "@/lib/utils";

const ReservedAnimalCells = ({ reservedAnimalList, direction }: { reservedAnimalList: string[], direction: Direction }) => {
  const isHorizontal = direction === "left" || direction === "right"

  return (
    <div className={cn("flex bg-gray-300 rounded-md justify-evenly", isHorizontal ? "flex-col" : "")} >
      {reservedAnimalList.map((cell, cellIndex) => (
        <div key={cellIndex} className="flex flex-col items-center justify-evenly w-16 h-16 rounded-md">
          <Cell cell={cell} isAnimalCell={animalEmojiCells.includes(cell)} />
        </div>
      ))}
    </div>
  )
}

export default ReservedAnimalCells;