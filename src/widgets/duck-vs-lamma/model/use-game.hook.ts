'use client'

import { useCrossPadStore } from "@/src/entities/cross-pad/model/store";
import { useGameStore } from "./store";
import { useEffect } from "react";

let previousCount = 0;

export const useGame = () => {
  const {
    currentEmojiBoard,
    setBoard,
    getReservedAnimalMaps,
    backwardGame,
    getCount,
    getMaxCount,
    getPlayTime,
    isWon,
    getLammaCount,
    getDuckCount,
    moveAnimalCells,
    clearBoard
  } = useGameStore();

  const { currentDirection, count } = useCrossPadStore();

  useEffect(() => {
    if (currentDirection && count == previousCount + 1) {
      moveAnimalCells(currentDirection);
      previousCount = count;
    }
  }, [currentDirection, count]);

  return {
    currentEmojiBoard,
    reservedAnimalMaps: getReservedAnimalMaps,
    backwardGame,
    setBoard,
    clearBoard,
    gameInfo: {
      count: getCount,
      maxCount: getMaxCount,
      playTime: getPlayTime,
      isWon,
      lammaCount: getLammaCount,
      duckCount: getDuckCount,
    }
  };
};