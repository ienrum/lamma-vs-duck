'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const BackButton = ({ className, path = '/home' }: { className?: string, path?: string }) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.push(path)}
      className={cn('hover:bg-gray-100', className)}
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
}; 