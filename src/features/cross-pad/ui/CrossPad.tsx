'use client'

import { Button } from "@/src/shared/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useCrossPadStore } from "@/src/entities/cross-pad/model/store";
import { Direction } from "@/src/entities/cross-pad/model/types";

interface CrossPadProps {
  className?: string;
}

export const CrossPad = ({
  className,
}: CrossPadProps) => {
  const { setDirection, setPressed } = useCrossPadStore();

  const handleButtonClick = (direction: Direction) => () => {
    setDirection(direction);
    setPressed(true);
    console.log("clicked", direction);
  }

  return (
    <div className={cn("grid grid-cols-3 gap-2 w-36 h-36", className)}>
      <div className="col-start-2">
        <Button
          color="crossPad"
          onClick={handleButtonClick("up")}
          isSticker={false}
          containerClassName="w-10 h-10"
          data-testid="arrow-up"
        >
          <ArrowUp />
        </Button>
      </div>
      <div className="col-start-1 row-start-2">
        <Button
          color="crossPad"
          onClick={handleButtonClick("left")}
          isSticker={false}
          containerClassName="w-10 h-10"
          data-testid="arrow-left"
        >
          <ArrowLeft />
        </Button>
      </div>
      <div className="col-start-3 row-start-2">
        <Button
          color="crossPad"
          onClick={handleButtonClick("right")}
          isSticker={false}
          containerClassName="w-10 h-10"
          data-testid="arrow-right"
        >
          <ArrowRight />
        </Button>
      </div>
      <div className="col-start-2 row-start-3">
        <Button
          color="crossPad"
          onClick={handleButtonClick("down")}
          isSticker={false}
          containerClassName="w-10 h-10"
          data-testid="arrow-down"
        >
          <ArrowDown />
        </Button>
      </div>
    </div>
  );
}; 