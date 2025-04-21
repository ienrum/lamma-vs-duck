import { animalEmojiCells } from '@/src/entities/duck-vs-lamma/model/constants';
import Cell from './cell';
import { motion, AnimatePresence } from 'framer-motion';

const GameBoard = ({ currentEmojiBoard }: { currentEmojiBoard: string[][] }) => {
  return (
    <motion.div className="flex flex-col items-center justify-center rounded-md bg-gray-100" layout>
      <AnimatePresence mode="popLayout">
        {currentEmojiBoard.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="justify-space-between flex items-center gap-2 p-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {row.map((cell, cellIndex) => (
              <motion.div
                key={cellIndex}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Cell cell={cell} isAnimalCell={animalEmojiCells.includes(cell)} cellContainerType="board" />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default GameBoard;
