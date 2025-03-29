'use client'

import { useCallback, useEffect } from "react";
import { Direction, CrossPadEvents } from "@/src/entities/cross-pad/model/types";
import { useCrossPadStore } from "@/src/entities/cross-pad/model/store";

export const useCrossPad = (events: CrossPadEvents) => {
  const { setDirection, setPressed, currentDirection, isPressed } = useCrossPadStore();

  const handlePress = useCallback(
    (direction: Direction) => {
      setDirection(direction);
      setPressed(true);
      events.onPress(direction);
    },
    [events, setDirection, setPressed]
  );

  return {
    state: {
      currentDirection,
      isPressed,
    },
    handlePress,
  };
}; 