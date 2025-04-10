'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/card';
import { TOPBAR_TITLE } from './constants/page';
import { Button } from '@/src/shared/ui/button';
import { useRouter } from 'next/navigation';
import { useFocusStore } from '@/src/shared/model/focus.store';
import { signInTooltipId } from '@/src/widgets/TopBar/ui/ProfileButton';
import { useUser } from '@/src/shared/api/use-user';

const HomePage = () => {
  const router = useRouter();
  const { focus } = useFocusStore()
  const { user } = useUser()

  const handleStartGame = () => {
    if (!user) {
      focus(signInTooltipId, 'Sign in', 3000)
    } else {
      router.push('/lamma-vs-duck')
    }
  }

  return (
    <div className='flex flex-col gap-4 p-4'>
      <Card >
        <CardHeader>
          <CardTitle>{TOPBAR_TITLE}</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <Button color="secondary" onClick={handleStartGame}>시작 하기</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
