'use client';

import {
  Dialog as RadixDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface DialogProps {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const Dialog = ({
  trigger,
  title,
  description,
  children,
  className,
}: DialogProps) => {
  return (
    <RadixDialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn('max-w-none', className)}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </RadixDialog>
  );
}; 