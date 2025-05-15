import { useRef } from 'react';
import { useActionState } from 'react';
import { endGameAction } from '../api/end-game-action';

interface UseGameSubmissionProps {
  gameId: number;
  getGameScore: () => string;
}

interface UseGameSubmissionReturn {
  formAction: (formData: FormData) => void;
  isPending: boolean;
  error: string | null;
  success: boolean;
}

export const useGameSubmission = ({ gameId, getGameScore }: UseGameSubmissionProps): UseGameSubmissionReturn => {
  const [state, formAction, isPending] = useActionState(endGameAction, null);

  const error = state?.error || null;
  const success = state?.status === 'success';

  return {
    formAction,
    isPending,
    error,
    success,
  };
};
