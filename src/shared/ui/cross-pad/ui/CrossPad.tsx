import { Button } from "@/src/shared/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

interface CrossPadProps {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  className?: string;
}

export const CrossPad = ({
  onUp,
  onDown,
  onLeft,
  onRight,
  className,
}: CrossPadProps) => {
  return (
    <div className={cn("grid grid-cols-3 gap-2 w-36 h-36", className)}>
      <div className="col-start-2">
        <Button
          color="crossPad"
          onClick={onUp}
          isSticker={false}
          containerClassName="w-10 h-10"
        >
          <ArrowUp />
        </Button>
      </div>
      <div className="col-start-1 row-start-2">
        <Button
          color="crossPad"
          onClick={onLeft}
          isSticker={false}
          containerClassName="w-10 h-10"
        >
          <ArrowLeft />
        </Button>
      </div>
      <div className="col-start-3 row-start-2">
        <Button
          color="crossPad"
          onClick={onRight}
          isSticker={false}
          containerClassName="w-10 h-10"
        >
          <ArrowRight />
        </Button>
      </div>
      <div className="col-start-2 row-start-3">
        <Button
          color="crossPad"
          onClick={onDown}
          isSticker={false}
          containerClassName="w-10 h-10"
        >
          <ArrowDown />
        </Button>
      </div>
    </div>
  );
}; 