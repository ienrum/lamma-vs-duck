import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { BackButton as BackButtonComponent } from './BackButton';
import ProfileButton from './ProfileButton';
import { ThemeToggle } from '@/src/shared/ui/theme-toggle';

interface TopBarProps {
  children?: ReactNode;
  className?: string;
  showBackButton?: boolean;
  backButtonPath?: string;
}

interface TopBarChildProps {
  className?: string;
}

export const TopBar = ({ children, className, showBackButton = false, backButtonPath }: TopBarProps) => {
  return (
    <header
      className={cn(
        'comic-shadow sticky top-0 z-50 h-20 w-full rounded-b-2xl border-b-4 border-black bg-white',
        'grid grid-cols-3 items-center gap-4 px-6',
        className
      )}
    >
      {showBackButton && <BackButtonComponent path={backButtonPath} />}
      {children}
    </header>
  );
};

const Left = ({ children, className }: TopBarProps) => {
  return <div className={cn('col-start-1 flex items-center gap-3', className)}>{children}</div>;
};

const Right = ({ children, className }: TopBarProps) => {
  return (
    <div className={cn('col-start-3 flex items-center justify-end gap-3', className)}>
      <ThemeToggle />
      {children}
    </div>
  );
};

const Center = ({ children, className }: TopBarProps) => {
  return <div className={cn('col-start-2 flex items-center justify-center', className)}>{children}</div>;
};

const Title = ({ className, text }: TopBarProps & { text: string }) => {
  return <h1 className={cn('text-2xl font-bold tracking-tight text-black', className)}>{text}</h1>;
};

const BackButton = ({ className, path }: TopBarChildProps & { path?: string }) => {
  return (
    <BackButtonComponent
      className={cn('flex items-center transition-transform hover:scale-105', className)}
      path={path}
    />
  );
};

const ProfileLink = ({ className }: TopBarChildProps) => {
  return <ProfileButton className={cn('transition-transform hover:scale-105', className)} />;
};

TopBar.Left = Left;
TopBar.Right = Right;
TopBar.Center = Center;
TopBar.Title = Title;
TopBar.BackButton = BackButton;
TopBar.ProfileLink = ProfileLink;
