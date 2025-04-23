'use client';

import { Button } from '@/src/shared/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useGame } from '../model/use-game.hook';
import { useBackButtonStore } from '@/src/entities/back-button/model/store';

const BackwardButton = () => {
  const { backwardGame } = useGame();
  const { backwardGame: backwardGameButton } = useBackButtonStore();

  const handleClick = () => {
    backwardGame();
    backwardGameButton();
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      <ChevronLeft />
    </Button>
  );
};

export default BackwardButton;
