import React from 'react';
import { cn } from '@/lib/utils';

interface CarrockAnimationProps {
  className?: string;
}

export const CarrockAnimation: React.FC<CarrockAnimationProps> = ({ className }) => {
  return (
    <div className={cn('relative h-16 w-16 overflow-hidden rounded-lg bg-yellow-600', className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-12 w-12">
          {/* Car moving horizontally */}
          <div className="absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 animate-[car-drive_2s_linear_infinite]">
            <div className="animate-[car-bounce_0.3s_ease-in-out_infinite]">🚗</div>
          </div>
          {/* Motorcycles chasing from right to left */}
          <div className="absolute top-1/3 right-0 h-3 w-3 animate-[motorcycle-chase_2s_linear_infinite]">
            🏍️
          </div>
          <div className="absolute top-2/3 right-0 h-3 w-3 animate-[motorcycle-chase_2.3s_linear_infinite_0.5s]">
            🏍️
          </div>
        </div>
      </div>
    </div>
  );
};