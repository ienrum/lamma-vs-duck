import { Direction } from '@/src/entities/cross-pad/model/types';
import { animalEmojiCells } from '@/src/entities/duck-vs-lamma/model/constants';
import Cell from './cell';
import { cn } from '@/lib/utils';

const ReservedAnimalCells = ({
  reservedAnimalList,
  direction,
}: {
  reservedAnimalList: string[];
  direction: Direction;
}) => {
  const isHorizontal = direction === 'left' || direction === 'right';

  return (
    <div className={cn('flex rounded-md bg-gray-300', isHorizontal ? 'flex-col' : '')}>
      {reservedAnimalList.map((cell, cellIndex) => (
        <div key={cellIndex} className="flex h-12 w-12 flex-col items-center justify-evenly rounded-md">
          <Cell
            cell={cell}
            isAnimalCell={animalEmojiCells.includes(cell)}
            cellContainerType={isHorizontal ? 'horizontal' : 'vertical'}
          />
        </div>
      ))}
    </div>
  );
};

export default ReservedAnimalCells;
