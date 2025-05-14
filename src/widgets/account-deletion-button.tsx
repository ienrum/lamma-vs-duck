'use client';

import { Button } from '@/components/ui/button';
import { deleteAccount } from '@/src/entities/account/model';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

const AccountDeletionButton = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDeleteAccount = async () => {
    const { data } = await deleteAccount();

    if (data) {
      await queryClient.removeQueries();
      router.push('/');
    }
  };

  return (
    <form action={handleDeleteAccount} className="flex w-full justify-end">
      <Button className="pearl-hover bg-destructive/70" type="submit" disabled={isPending}>
        {isPending ? 'Deleting...' : 'Delete Account'}
      </Button>
    </form>
  );
};

export default AccountDeletionButton;
