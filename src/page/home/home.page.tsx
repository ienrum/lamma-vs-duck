'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/card';
import { Button } from '@/src/shared/ui/button';
import { useRouter } from 'next/navigation';
import useGetGameList from '@/src/features/game/api/use-get-game-list';
import { HelpButton } from '@/src/widgets/TopBar/ui/HelpButton';

const HomePage = () => {
  const router = useRouter();
  const { data: gameList } = useGetGameList();

  const handleStartGame = (gameId: number) => {
    router.push(`/game/${gameId}`);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {gameList.map((game) => (
        <Card key={game.id}>
          <CardHeader>
            <CardTitle>{game.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div key={game.id} className="flex justify-between gap-2">
              <Button
                key={game.id}
                color="secondary"
                onClick={() => handleStartGame(game.id)}
                containerClassName="w-full"
              >
                PLAY NOW
              </Button>
              <HelpButton />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HomePage;
