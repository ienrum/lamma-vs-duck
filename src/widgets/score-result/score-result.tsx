'use client';

import { Dialog } from '@/src/shared/ui/Dialog';
import { Button } from '@/src/shared/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
const title = 'Record your score';

const buttonText = 'Sign in to record your score';

const ScoreResult = ({ isAuthenticated, open }: { isAuthenticated: boolean; open: boolean }) => {
  const router = useRouter();
  return (
    <Dialog open={open && !isAuthenticated} title={title}>
      <DialogTrigger>
        <Button onClick={() => router.push('/signin')}>{buttonText}</Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default ScoreResult;
