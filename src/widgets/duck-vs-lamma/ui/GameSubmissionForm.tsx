import React from 'react';
import Spinner from '@/src/shared/ui/spinner';

interface GameSubmissionFormProps {
  gameEndRef: React.RefObject<HTMLFormElement | null>;
  formAction: (formData: FormData) => void;
  gameId: number;
  getGameScore: () => string;
}

export const GameSubmissionForm: React.FC<GameSubmissionFormProps> = ({
  gameEndRef,
  formAction,
  gameId,
  getGameScore,
}) => {
  return (
    <>
      <form action={formAction} hidden ref={gameEndRef}>
        <input type="hidden" name="gameId" value={gameId} />
        <input type="hidden" name="score" value={getGameScore()} />
      </form>
    </>
  );
};
