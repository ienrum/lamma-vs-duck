'use client';

import { useGame } from '../model/use-game.hook';
import { useParams } from 'next/navigation';
import useGetGameBoard from '@/src/features/game/api/use-get-game-board';
import Spinner from '@/src/shared/ui/spinner';
import { useGamePersistence } from '../hooks/use-game-persistence';
import { useGameSubmission } from '../hooks/use-game-submission';
import { GameSubmissionForm } from './GameSubmissionForm';
import { GameBoardLayout } from './GameBoardLayout';
import { Suspense, useRef } from 'react';

const DuckVsLammaBoard = () => {
  const { currentEmojiBoard, gameInfo, reservedAnimalMaps, setBoard, endGame } = useGame();
  const gameId = Number(useParams().gameId);
  const gameEndRef = useRef<HTMLFormElement>(null);
  const { data } = useGetGameBoard(gameId);

  // 게임 상태 지속성 관리
  const { getGameScore } = useGamePersistence({
    gameInfo,
    endGame,
    setBoard,
    boardData: data,
    onGameEnd: () => {
      gameEndRef.current?.requestSubmit();
    },
  });

  // 게임 제출 로직 관리
  const { formAction, isPending, error } = useGameSubmission({
    gameId,
    getGameScore,
  });

  if (!currentEmojiBoard) {
    return <Spinner size="lg" className="mx-auto" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Suspense fallback={<Spinner size="lg" className="mx-auto" />}>
      <GameSubmissionForm
        gameEndRef={gameEndRef}
        formAction={formAction}
        gameId={gameId}
        getGameScore={getGameScore}
        isPending={isPending}
      />

      <GameBoardLayout
        currentEmojiBoard={currentEmojiBoard}
        gameInfo={gameInfo}
        reservedAnimalMaps={reservedAnimalMaps}
      />
    </Suspense>
  );
};

export default DuckVsLammaBoard;
