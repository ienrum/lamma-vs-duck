'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/card';
import { TOPBAR_TITLE } from './constants/page';
import { Button } from '@/src/shared/ui/button';
import { useRouter } from 'next/navigation';
import { useFocusStore } from '@/src/shared/model/focus.store';
import { signInTooltipId } from '@/src/widgets/TopBar/ui/ProfileButton';
import { useUser } from '@/src/shared/api/use-user';
import useGetGameList from '@/src/features/game/api/use-get-game-list';
import useGetPlayToday from '@/src/features/game/api/use-get-play-today';

const HomePage = () => {
  const router = useRouter();
  const { focus } = useFocusStore()
  const { user } = useUser()
  const { data: gameList } = useGetGameList();
  const { data: isPlayedToday } = useGetPlayToday(!!user);

  const handleStartGame = (gameId: number) => {
    if (!user) {
      focus(signInTooltipId, 'Sign in', 3000)
      return;
    }

    if (isPlayedToday) {
      router.push('/result')
      return;
    }

    router.push(`/game/${gameId}`)
  }

  return (
    <div className='flex flex-col gap-4 p-4'>
      <Card >
        <CardHeader>
          <CardTitle>{TOPBAR_TITLE}</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          {gameList.map((game) => (
            <Button key={game.id} color="secondary" onClick={() => handleStartGame(game.id)}>{game.title}</Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
