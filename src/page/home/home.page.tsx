'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import useGetGameList from '@/src/features/game/api/use-get-game-list';
import { HelpButton } from '@/src/widgets/TopBar/ui/HelpButton';
import { StatsLink } from '@/src/widgets/TopBar/ui/StatsLink';
import { DuckLammaAnimation } from '@/src/shared/ui/game-animations/DuckLammaAnimation';
import { GreedyBeeAnimation } from '@/src/shared/ui/game-animations/GreedyBeeAnimation';

const HomePage = () => {
  const router = useRouter();
  const { data: gameList } = useGetGameList();

  const handleStartGame = (gameId: number) => {
    router.push(`/game/${gameId}`);
  };

  const getGameAnimation = (gameId: number) => {
    switch (gameId) {
      case 1:
        return <DuckLammaAnimation />;
      case 2:
        return <GreedyBeeAnimation />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {gameList.map((game) => (
        <Card key={game.id} className="pearl-hover">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{game.title}</CardTitle>
            {getGameAnimation(game.id)}
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div key={game.id} className="flex justify-between gap-2">
              <Button
                key={game.id}
                color="secondary"
                onClick={() => handleStartGame(game.id)}
                containerClassName="w-full"
                className="pearl-hover"
              >
                PLAY NOW
              </Button>
              <div className="flex gap-2">
                <HelpButton gameRuleTitle={game.ruleTitle} gameRuleScript={game.ruleScript} />
                <StatsLink gameId={game.id.toString()} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HomePage;
