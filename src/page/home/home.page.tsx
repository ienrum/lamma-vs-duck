'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import useGetGameList from '@/src/features/game/api/use-get-game-list';
import { HelpButton } from '@/src/widgets/TopBar/ui/HelpButton';
import { StatsLink } from '@/src/widgets/TopBar/ui/StatsLink';
import { DuckLammaAnimation } from '@/src/shared/ui/game-animations/DuckLammaAnimation';
import { GreedyBeeAnimation } from '@/src/shared/ui/game-animations/GreedyBeeAnimation';
import OneTapComponent from '@/src/shared/ui/google-one-tap';
import ProductHuntButton from '@/src/shared/ui/product-hunt-button';

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
    <div className="from-background to-secondary/30 min-h-screen bg-gradient-to-b py-12">
      <div className="pearl-container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <OneTapComponent />
          {gameList.map((game) => (
            <Card key={game.id} className="pearl-hover glass-effect overflow-hidden rounded-2xl">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">{game.title}</CardTitle>
                  <div className="bg-primary/10 rounded-full p-3">{getGameAnimation(game.id)}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{game.ruleTitle}</p>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => handleStartGame(game.id)}
                    className="pearl-hover bg-primary flex-1 rounded-xl font-semibold"
                  >
                    PLAY NOW
                  </Button>
                  <div className="flex gap-2">
                    <HelpButton
                      gameRuleTitle={game.ruleTitle}
                      gameRuleScript={game.ruleScript}
                      className="rounded-xl"
                    />
                    <StatsLink gameId={game.id.toString()} className="rounded-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <ProductHuntButton />
    </div>
  );
};

export default HomePage;
