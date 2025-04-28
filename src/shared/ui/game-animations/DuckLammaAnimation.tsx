import React from 'react';
import { cn } from '@/lib/utils';

interface DuckLammaAnimationProps {
  className?: string;
}

export const DuckLammaAnimation: React.FC<DuckLammaAnimationProps> = ({ className }) => {
  return (
    <div className={cn('bg-card relative h-16 w-16 overflow-hidden rounded-lg', className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid h-12 w-12 grid-cols-2 gap-1">
          {[1, 2, 3, 4].map((tile) => (
            <div
              key={tile}
              className={cn(
                'bg-primary h-5 w-5 rounded-sm',
                tile % 2 === 0
                  ? 'animate-[slide-left_2s_ease-in-out_infinite]'
                  : 'animate-[slide-right_2s_ease-in-out_infinite]'
              )}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-sm">{tile % 3 === 1 ? '🦆' : '🦙'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
