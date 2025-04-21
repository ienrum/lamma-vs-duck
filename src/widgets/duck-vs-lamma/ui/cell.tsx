import { useCrossPadStore } from '@/src/entities/cross-pad/model/store';
import { motion } from 'framer-motion';

const Cell = ({
  cell,
  isAnimalCell,
  cellContainerType,
}: {
  cell: string;
  isAnimalCell: boolean;
  cellContainerType: 'vertical' | 'horizontal' | 'board';
}) => {
  const { count, currentDirection } = useCrossPadStore();

  const initialPosition = {
    up: {
      x: 0,
      y: 40,
    },
    down: {
      x: 0,
      y: -40,
    },
    left: {
      x: 40,
      y: 0,
    },
    right: {
      x: -40,
      y: 0,
    },
    initial: {
      x: 0,
      y: 0,
    },
  }[currentDirection || 'initial'];

  const direction = {
    up: 'vertical',
    down: 'vertical',
    left: 'horizontal',
    right: 'horizontal',
    initial: 'board',
  }[currentDirection || 'initial'];

  if (cellContainerType === 'horizontal' && direction === 'vertical') {
    initialPosition.y = 0;
  } else if (cellContainerType === 'vertical' && direction === 'horizontal') {
    initialPosition.x = 0;
  }

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-gray-200 text-2xl">
      {isAnimalCell && (
        <motion.div
          initial={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            x: initialPosition.x,
            y: initialPosition.y,
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
            duration: 0.5,
          }}
          whileHover={{
            scale: 1.2,
            rotate: 0,
            transition: { duration: 0.2 },
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
