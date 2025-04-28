'use client';

import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
const title = 'Record your score';

const buttonText = 'Sign in to record your score';
const homeButtonText = 'Sign in to record your score';

const ScoreResult = ({ isAuthenticated, open }: { isAuthenticated: boolean; open: boolean }) => {
  const router = useRouter();
  return (
    <Dialog open={open && !isAuthenticated} title={title}>
      {/* <Button onClick={() => router.push('/signin')}>{buttonText}</Button> */}
      <Button onClick={() => router.push('/home')}>{homeButtonText}</Button>
    </Dialog>
  );
};

export default ScoreResult;
