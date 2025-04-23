'use client';

import { Button } from '@/components/ui/button';
import { User, LogOut, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useUser } from '@/src/shared/api/use-user';
import { signoutAction } from '@/src/shared/api/actions/signout-action';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

const ProfileButton = () => {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <Button variant="ghost" size="icon" className="hover:bg-gray-100" onClick={() => router.push('/signin')}>
        <User className="h-5 w-5" />
      </Button>
    );
  }

  const handleValueChange = (value: string) => {
    if (value === 'profile') {
      router.push('/profile');
    } else if (value === 'signout') {
      signoutAction();
      if (typeof window !== 'undefined') {
        window.location.href = '/home';
      }
    }
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100" type="button">
          <Image src={user!.avatar_url} alt="profile" width={32} height={32} className="rounded-full" />
        </Button>
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="profile">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </SelectItem>
        <SelectItem value="signout">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ProfileButton;
