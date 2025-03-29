'use client';

import { CrossPad } from "@/src/shared/ui/cross-pad";
import { useCrossPad } from "../model/useCrossPad";
import { Direction } from "@/src/entities/cross-pad/model/types";

interface CrossPadContainerProps {
  onPress: (direction: Direction) => void
}

export const CrossPadContainer = ({
  onPress
}: CrossPadContainerProps) => {
  const { handlePress } = useCrossPad({
    onPress
  })

  return (
    <div className="flex justify-center items-center">
      <CrossPad
        onUp={() => handlePress("up")}
        onDown={() => handlePress("down")}
        onLeft={() => handlePress("left")}
        onRight={() => handlePress("right")}
      />
    </div>
  );
}; 