'use client';

import { Button } from '@/components/ui/button';
import { User, LogOut, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useUser } from '@/src/shared/api/use-user';
import { signoutAction } from '@/src/shared/api/actions/signout-action';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProfileButtonProps {
  className?: string;
}

const ProfileButton = ({ className }: ProfileButtonProps) => {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <Button
        variant="outline"
        size="icon"
        className={cn('hover:bg-gray-100', className)}
        onClick={() => router.push('/signin')}
        aria-label="Sign in"
      >
        <User className="h-5 w-5" />
      </Button>
    );
  }

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleSignOut = async () => {
    await signoutAction();
    if (typeof window !== 'undefined') {
      window.location.href = '/home';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={cn('hover:bg-gray-100', className)} aria-label="Profile menu">
          <img src={user.avatar_url} alt="Profile" width={32} height={32} className="rounded-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
