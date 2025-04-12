'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/card';
import { TOPBAR_TITLE } from './constants/page';
import { Button } from '@/src/shared/ui/button';
import { useRouter } from 'next/navigation';
import useGetGameList from '@/src/features/game/api/use-get-game-list';
import Image from 'next/image';

const HomePage = () => {
  const router = useRouter();
  const { data: gameList } = useGetGameList();

  const handleStartGame = (gameId: number) => {
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
            <Button key={game.id} color="secondary" onClick={() => handleStartGame(game.id)}>
              <div className='flex items-center gap-2'>
                <Image src="/favicon.ico" alt="game" width={20} height={20} className='rounded-full bg-amber-600 border-2 border-black' />
                {game.title}
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
