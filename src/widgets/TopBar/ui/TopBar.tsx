import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { BackButton } from './BackButton';
import { ProfileLink } from './ProfileLink';
import { HelpButton } from './HelpButton';
import { StatsLink } from './StatsLink';

interface TopBarProps {
  children?: ReactNode;
  className?: string;
}

interface TopBarChildProps {
  className?: string;
}

export const TopBar = ({ children, className }: TopBarProps) => {
  return (
    <header className={cn('w-full h-16 border-b items-center px-4 grid grid-cols-3 gap-4', className)}>
      {children}
    </header>
  );
};

TopBar.Left = ({ children, className }: TopBarProps) => {
  return <div className={cn('flex items-center col-start-1', className)}>{children}</div>;
};

TopBar.Right = ({ children, className }: TopBarProps) => {
  return <div className={cn('flex items-center justify-end gap-2 col-start-3', className)}>{children}</div>;
};

TopBar.Center = ({ children, className }: TopBarProps) => {
  return <div className={cn('flex items-center justify-center col-start-2', className)}>{children}</div>;
};

TopBar.Title = ({ className, text }: TopBarProps & { text: string }) => {
  return <div className={cn('flex items-center ', className)}>{text}</div>;
};

TopBar.BackButton = ({ className }: TopBarChildProps) => {
  return <BackButton className={cn('flex items-center', className)} />;
};

TopBar.ProfileLink = ({ className }: TopBarChildProps) => {
  return <ProfileLink className={cn('flex items-center', className)} />;
};

TopBar.HelpButton = ({ className }: TopBarChildProps) => {
  return <HelpButton className={cn('flex items-center', className)} />;
};

TopBar.StatsLink = ({ className }: TopBarChildProps) => {
  return <StatsLink className={cn('flex items-center', className)} />;
};
