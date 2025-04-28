import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { BackButton as BackButtonComponent } from './BackButton';
import ProfileButton from './ProfileButton';

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
        'grid h-14 w-full grid-cols-3 items-center gap-4 border-b px-4 sm:h-16',
        'sticky top-0 z-50 bg-white',
        className
      )}
    >
      {showBackButton && <BackButtonComponent path={backButtonPath} />}
      {children}
    </header>
  );
};

const Left = ({ children, className }: TopBarProps) => {
  return <div className={cn('col-start-1 flex items-center gap-2', className)}>{children}</div>;
};

const Right = ({ children, className }: TopBarProps) => {
  return <div className={cn('col-start-3 flex items-center justify-end gap-2', className)}>{children}</div>;
};

const Center = ({ children, className }: TopBarProps) => {
  return <div className={cn('col-start-2 flex items-center justify-center', className)}>{children}</div>;
};

const Title = ({ className, text }: TopBarProps & { text: string }) => {
  return <h1 className={cn('text-lg font-semibold sm:text-xl', className)}>{text}</h1>;
};

const BackButton = ({ className, path }: TopBarChildProps & { path?: string }) => {
  return <BackButtonComponent className={cn('flex items-center', className)} path={path} />;
};

const ProfileLink = ({ className }: TopBarChildProps) => {
  return <ProfileButton className={className} />;
};

TopBar.Left = Left;
TopBar.Right = Right;
TopBar.Center = Center;
TopBar.Title = Title;
TopBar.BackButton = BackButton;
TopBar.ProfileLink = ProfileLink;
