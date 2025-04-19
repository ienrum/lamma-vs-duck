const Cell = ({ cell, isAnimalCell }: { cell: string, isAnimalCell: boolean }) => {
  return (
    <>
      {isAnimalCell && (
        <div className="flex items-center justify-center text-2xl rounded-sm bg-gray-200 w-8 h-8">
          {cell}
        </div >
      )}
    </>
  );
};

export default Cell;