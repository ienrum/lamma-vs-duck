import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6 border-4',
  md: 'w-10 h-10 border-4',
  lg: 'w-16 h-16 border-6',
};

const Spinner: FC<SpinnerProps> = ({ size = 'md', className }) => {
  return (
    <div
      className={twMerge(
        'animate-spin rounded-full border-blue-500 border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
