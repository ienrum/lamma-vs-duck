import { Button } from '@/components/ui/button';
import { BarChart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const StatsLink = ({ className }: { className?: string }) => {
  return (
    <Link href="/stats">
      <Button variant="ghost" size="icon" className={cn('hover:bg-gray-100', className)}>
        <BarChart className="h-5 w-5" />
      </Button>
    </Link>
  );
}; 