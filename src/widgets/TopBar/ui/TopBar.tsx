import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { BackButton as BackButtonComponent } from './BackButton';
import ProfileButton from './ProfileButton';

interface TopBarProps {
  children?: ReactNode;
  className?: string;
}

interface TopBarChildProps {
  className?: string;
}

export const TopBar = ({ children, className }: TopBarProps) => {
  return (
    <header className={cn('grid h-16 w-full grid-cols-3 items-center gap-4 border-b px-4', className)}>
      {children}
    </header>
  );
};

const Left = ({ children, className }: TopBarProps) => {
  return <div className={cn('col-start-1 flex items-center', className)}>{children}</div>;
};

const Right = ({ children, className }: TopBarProps) => {
  return <div className={cn('col-start-3 flex items-center justify-end gap-2', className)}>{children}</div>;
};

const Center = ({ children, className }: TopBarProps) => {
  return <div className={cn('col-start-2 flex items-center justify-center', className)}>{children}</div>;
};

const Title = ({ className, text }: TopBarProps & { text: string }) => {
  return <div className={cn('flex items-center', className)}>{text}</div>;
};

const BackButton = ({ className }: TopBarChildProps) => {
  return <BackButtonComponent className={cn('flex items-center', className)} />;
};

const ProfileLink = ({ className }: TopBarChildProps) => {
  return <ProfileButton />;
};

TopBar.Left = Left;
TopBar.Right = Right;
TopBar.Center = Center;
TopBar.Title = Title;
TopBar.BackButton = BackButton;
TopBar.ProfileLink = ProfileLink;
