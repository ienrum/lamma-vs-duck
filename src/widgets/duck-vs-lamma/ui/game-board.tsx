import { animalEmojiCells } from "@/src/entities/duck-vs-lamma/model/constants";
import Cell from "./cell";

const GameBoard = ({ currentEmojiBoard }: { currentEmojiBoard: string[][] }) => {
  return (
    <div className="flex flex-col bg-gray-100 p-4 rounded-md" >
      {currentEmojiBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center justify-evenly">
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