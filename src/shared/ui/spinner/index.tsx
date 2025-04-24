'use client';

import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export const Spinner: FC<SpinnerProps> = ({ size = 'md', className }) => {
  return (
    <div
      className={twMerge(
        'border-primary-DEFAULT animate-spin rounded-full border-4 border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
