import { useEffect, useRef } from 'react';
import { BoardStateUpdate } from '@/src/entities/duck-vs-lamma/model/types';

export interface GameState {
  score: number;
  boardState: BoardStateUpdate;
}

interface UseGamePersistenceProps {
  isAuthenticated: boolean;
  gameInfo: {
    playTime: () => number;
    boardState: () => BoardStateUpdate | null;
    isWon: () => boolean;
  };
  endGame: (endTime: Date) => void;
  setBoard: (
    board: any,
    reservedAnimalMaps: any,
    whoIsWin: string,
    score?: number,
    boardState?: BoardStateUpdate
  ) => void;
  boardData: {
    board: any;
    reservedAnimalMaps: any;
    whoIsWin: string;
  };
  onGameEnd: () => void;
}

interface UseGamePersistenceReturn {
  getGameScore: () => string;
}

export const useGamePersistence = ({
  gameInfo,
  endGame,
  setBoard,
  boardData,
  onGameEnd,
}: UseGamePersistenceProps): UseGamePersistenceReturn => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 게임 상태 초기 로드
  useEffect(() => {
    setBoard(boardData.board, boardData.reservedAnimalMaps, boardData.whoIsWin);
  }, [boardData.board, boardData.reservedAnimalMaps, setBoard]);

  const isWon = gameInfo.isWon();
  // 게임 승리 시 처리
  useEffect(() => {
    if (isWon) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      endGame(new Date());
      onGameEnd();
    }
  }, [isWon]);

  // 게임 점수 가져오기
  const getGameScore = (): string => {
    return gameInfo.playTime().toString();
  };

  return {
    getGameScore,
  };
};
