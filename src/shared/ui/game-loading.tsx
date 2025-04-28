import { cn } from '@/lib/utils';

interface GameLoadingProps {
  gameId: number;
  className?: string;
}

export const GameLoading = ({ gameId, className }: GameLoadingProps) => {
  return (
    <div className={cn('bg-primary flex min-h-screen items-center justify-center', className)}>
      <div className="flex items-center gap-2">
        <div className="border-primary h-16 w-16 animate-spin rounded-full border-8 border-t-gray-300" />
      </div>
    </div>
  );
};
