import React from 'react';
import { cn } from '@/lib/utils';

interface GreedyBeeAnimationProps {
  className?: string;
}

export const GreedyBeeAnimation: React.FC<GreedyBeeAnimationProps> = ({ className }) => {
  return (
    <div className={cn('relative h-16 w-16 overflow-hidden rounded-lg bg-green-300', className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-12 w-12">
          {/* Bee */}
          <div className="absolute top-2/3 left-0 h-4 w-4 -translate-y-1/2 animate-[chase_3s_ease-in-out_infinite]">
            <div className="animate-[bee-fly_3s_ease-in-out_infinite]">🐝</div>
          </div>
          {/* Chaser (Duck or Lamma) */}
          <div className="absolute top-2/3 right-0 h-4 w-4 -translate-y-1/2 animate-[chase_3s_ease-in-out_infinite]">
            <div className="flex h-4 w-4 items-center justify-center rounded-full">🦙🦆</div>
          </div>
        </div>
      </div>
    </div>
  );
};
