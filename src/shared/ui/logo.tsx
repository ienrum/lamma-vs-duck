import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ className, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('relative rounded-full border-2', sizeClasses[size])}>
        <Image src="/favicon.ico" alt="Lamma vs Duck Logo" fill className="object-contain" />
      </div>
      <span
        className={cn('font-bold text-gray-900', {
          'text-lg': size === 'sm',
          'text-xl': size === 'md',
          'text-2xl': size === 'lg',
        })}
      >
        Lamma vs Duck
      </span>
    </div>
  );
};
