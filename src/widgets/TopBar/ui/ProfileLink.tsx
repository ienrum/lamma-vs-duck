import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import Link from 'next/link';

export const ProfileLink = ({ className }: { className?: string }) => {
  return (
    <Link href="/profile">
      <Button variant="ghost" size="icon" className={cn('hover:bg-gray-100', className)}>
        <User className="h-5 w-5" />
      </Button>
    </Link>
  );
}; 