import { BoardCell } from "@/src/entities/duck-vs-lamma/model/constants";
import { boardCellEmoji } from "@/src/entities/duck-vs-lamma/model/constants";

const Cell = ({ cell, isAnimalCell }: { cell: string, isAnimalCell: boolean }) => {
  const isVoid = cell === boardCellEmoji[BoardCell.Void]

  return (
    <>
      {isAnimalCell && (
        <div className="flex items-center justify-center text-2xl rounded-sm bg-gray-200 w-10 h-10">
          {cell}
        </div >
      )}
      {!isAnimalCell && !isVoid && <div className="flex items-center justify-center text-sm rounded-sm bg-transparent w-2 h-2 p-3">
        {/* {cell === boardCellEmoji[BoardCell.NothingSwitch] ? " " : cell} */}
        {"  "}
      </div >}
      {isVoid && <div className="flex items-center justify-center text-sm rounded-sm bg-transparent w-2 h-2 p-3">

      </div >}
    </>
  );
};

export default Cell;