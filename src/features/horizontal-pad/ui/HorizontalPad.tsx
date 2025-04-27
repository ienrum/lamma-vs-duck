'use client';

import { Button } from '@/src/shared/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCrossPadStore } from '@/src/entities/cross-pad/model/store';
import { Direction } from '@/src/entities/cross-pad/model/types';

interface HorizontalPadProps {
  className?: string;
}

export const HorizontalPad = ({ className }: HorizontalPadProps) => {
  const { setDirection, setPressed } = useCrossPadStore();

  const handleButtonClick = (direction: Direction) => () => {
    setDirection(direction);
    setPressed(true);
  };

  return (
    <div className={cn('flex h-12 w-full justify-center gap-16', className)}>
      <Button
        color="crossPad"
        onClick={handleButtonClick('left')}
        isSticker={false}
        containerClassName="w-12 h-12"
        data-testid="arrow-left"
      >
        <ArrowLeft />
      </Button>
      <Button
        color="crossPad"
        onClick={handleButtonClick('right')}
        isSticker={false}
        containerClassName="w-12 h-12"
        data-testid="arrow-right"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};
