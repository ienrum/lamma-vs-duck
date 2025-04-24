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
import ScoreResult from '../../score-result/score-result';
import { getQueryClient } from '@/src/app/utils/get-query-client';

const DuckVsLammaBoard = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { currentEmojiBoard, gameInfo, reservedAnimalMaps, setBoard, endGame } = useGame();
  const gameId = Number(useParams().gameId);
  const gameEndRef = useRef<HTMLFormElement>(null);
  const { data } = useGetGameBoard(gameId);

  // 게임 상태 지속성 관리
  const { getGameScore } = useGamePersistence({
    isAuthenticated,
    gameInfo,
    endGame,
    setBoard,
    boardData: data,
    onGameEnd: () => {
      if (!isAuthenticated) {
        return;
      }
      gameEndRef.current?.requestSubmit();
      getQueryClient().invalidateQueries({ queryKey: ['gameBoard', gameId] });
    },
  });

  // 게임 제출 로직 관리
  const { formAction, isPending, error } = useGameSubmission({
    gameId,
    getGameScore,
  });
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <ScoreResult isAuthenticated={isAuthenticated} open={gameInfo.isWon() && !isAuthenticated} />

      <GameSubmissionForm gameEndRef={gameEndRef} formAction={formAction} gameId={gameId} getGameScore={getGameScore} />
      <Spinner size="lg" className={currentEmojiBoard && !isPending ? 'hidden' : ''} />
      {currentEmojiBoard && (
        <GameBoardLayout
          currentEmojiBoard={currentEmojiBoard}
          gameInfo={gameInfo}
          reservedAnimalMaps={reservedAnimalMaps}
        />
      )}
    </>
  );
};

export default DuckVsLammaBoard;
