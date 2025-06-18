import { Button } from '@/components/ui/button';
import { BarChart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const StatsLink = ({ gameId, className }: { gameId: string; className?: string }) => {
  return (
    <Link href={`/result/${gameId}`}>
      <Button variant="link" size="icon" className={cn('hover:bg-gray-100', className)}>
        <BarChart className="h-5 w-5" />
      </Button>
    </Link>
  );
};
