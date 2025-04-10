import { animalEmojiCells } from "@/src/entities/duck-vs-lamma/model/constants";
import Cell from "./cell";

const GameBoard = ({ currentEmojiBoard }: { currentEmojiBoard: string[][] }) => {
  return (
    <div className="flex flex-col bg-gray-100 rounded-md justify-center items-center" >
      {currentEmojiBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center justify-space-between p-2 gap-2">
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} cell={cell} isAnimalCell={
              animalEmojiCells.includes(cell)} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default GameBoard;