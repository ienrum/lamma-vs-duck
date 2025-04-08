import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { BackButton as BackButtonComponent } from './BackButton';
import { ProfileLink as ProfileLinkComponent } from './ProfileLink';
import { HelpButton as HelpButtonComponent } from './HelpButton';
import { StatsLink as StatsLinkComponent } from './StatsLink';

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

const Left = ({ children, className }: TopBarProps) => {
  return <div className={cn('flex items-center col-start-1', className)}>{children}</div>;
};

const Right = ({ children, className }: TopBarProps) => {
  return <div className={cn('flex items-center justify-end gap-2 col-start-3', className)}>{children}</div>;
};

const Center = ({ children, className }: TopBarProps) => {
  return <div className={cn('flex items-center justify-center col-start-2', className)}>{children}</div>;
};

const Title = ({ className, text }: TopBarProps & { text: string }) => {
  return <div className={cn('flex items-center ', className)}>{text}</div>;
};

const BackButton = ({ className }: TopBarChildProps) => {
  return <BackButtonComponent className={cn('flex items-center', className)} />;
};

const ProfileLink = ({ className }: TopBarChildProps) => {
  return <ProfileLinkComponent />;
};

const HelpButton = ({ className }: TopBarChildProps) => {
  return <HelpButtonComponent className={cn('flex items-center', className)} />;
};

const StatsLink = ({ className }: TopBarChildProps) => {
  return <StatsLinkComponent className={cn('flex items-center', className)} />;
};

TopBar.Left = Left;
TopBar.Right = Right;
TopBar.Center = Center;
TopBar.Title = Title;
TopBar.BackButton = BackButton;
TopBar.ProfileLink = ProfileLink;
TopBar.HelpButton = HelpButton;
TopBar.StatsLink = StatsLink;