'use client';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';
import { deleteAccount } from '@/src/entities/account/model';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

const AccountDeletionButton = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDeleteAccount = async () => {
    startTransition(async () => {
      const { data } = await deleteAccount();

      if (data) {
        await queryClient.removeQueries();
        router.push('/');
      }
    });
  };

  return (
    <div className="flex justify-end">
      <Dialog
        title="Delete Account"
        trigger={
          <Button className="pearl-hover bg-destructive/70" disabled={isPending}>
            Delete Account
          </Button>
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and all of its data.
          </DialogDescription>
          <DialogFooter>
            <form action={handleDeleteAccount}>
              <Button className="pearl-hover bg-destructive/70" disabled={isPending}>
                Delete Account
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountDeletionButton;
