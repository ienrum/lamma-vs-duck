import { useCrossPadStore } from '@/src/entities/cross-pad/model/store';
import { motion } from 'framer-motion';
import { useGame } from '../model/use-game.hook';

const positionMap = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

const Cell = ({
  cell,
  isAnimalCell,
  cellContainerType,
}: {
  cell: string;
  isAnimalCell: boolean;
  cellContainerType: 'uprow' | 'downrow' | 'leftcol' | 'rightcol' | 'board';
}) => {
  const { count, currentDirection } = useCrossPadStore();
  const { gameInfo } = useGame();

  const position = { x: 0, y: 0 };

  const isStucked = currentDirection ? gameInfo.count(currentDirection) === gameInfo.maxCount(currentDirection) : false;

  if (isStucked) {
    position.x = 0;
    position.y = 0;
  } else if (cellContainerType === 'board' && currentDirection) {
    position.x = positionMap[currentDirection].x;
    position.y = positionMap[currentDirection].y;
  } else if (cellContainerType === 'uprow' && currentDirection === 'down') {
    position.x = 0;
    position.y = -40;
  } else if (cellContainerType === 'downrow' && currentDirection === 'up') {
    position.x = 0;
    position.y = 40;
  } else if (cellContainerType === 'leftcol' && currentDirection === 'right') {
    position.x = -40;
    position.y = 0;
  } else if (cellContainerType === 'rightcol' && currentDirection === 'left') {
    position.x = 40;
    position.y = 0;
  }

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-gray-200 text-2xl">
      {isAnimalCell && (
        <motion.div
          initial={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            x: position.x,
            y: position.y,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            x: 0,
            y: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.1,
          }}
          whileHover={{
            scale: 1.2,
            rotate: 0,
            transition: { duration: 0.1 },
          }}
          key={`${count}-${currentDirection}`}
        >
          {cell}
        </motion.div>
      )}
    </div>
  );
};

export default Cell;
