import { useEffect } from "react";
import { BoardStateUpdate } from "@/src/entities/duck-vs-lamma/model/types";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/src/shared/util/localstorage-utils";

export interface GameState {
  score: number;
  boardState: BoardStateUpdate;
}

interface UseGamePersistenceProps {
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
    boardState?: BoardStateUpdate,
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
  clearGameState: () => void;
}

let persistenceTimer: NodeJS.Timeout;

export const useGamePersistence = ({
  gameInfo,
  endGame,
  setBoard,
  boardData,
  onGameEnd
}: UseGamePersistenceProps): UseGamePersistenceReturn => {

  // 게임 상태 초기 로드
  useEffect(() => {
    const gameState = getLocalStorage<GameState>('gameState');
    if (gameState && boardData.board && boardData.reservedAnimalMaps) {
      setBoard(
        boardData.board,
        boardData.reservedAnimalMaps,
        gameState.boardState.whoIsWin || "lamma",
        Number(gameState.score),
        gameState.boardState,
      );
    } else {
      setBoard(boardData.board, boardData.reservedAnimalMaps, boardData.whoIsWin);
    }
  }, [boardData.board, boardData.reservedAnimalMaps, setBoard]);

  // 게임 상태 주기적 저장
  useEffect(() => {
    persistenceTimer = setInterval(() => {
      const playTime = gameInfo.playTime();
      const boardState = gameInfo.boardState();

      if (boardState) {
        setLocalStorage('gameState', {
          score: playTime,
          boardState: boardState,
        });
      }
    }, 1000);

    return () => {
      clearInterval(persistenceTimer);
    };
  }, []);

  const isWon = gameInfo.isWon();
  // 게임 승리 시 처리
  useEffect(() => {
    if (isWon) {
      clearInterval(persistenceTimer);
      endGame(new Date());
      removeLocalStorage('gameState');
      onGameEnd();
    }
  }, [isWon]);

  // 게임 점수 가져오기
  const getGameScore = (): string => {
    return getLocalStorage<GameState>('gameState')?.score?.toString() || '0';
  };

  // 게임 상태 정리
  const clearGameState = (): void => {
    removeLocalStorage('gameState');
  };

  return {
    getGameScore,
    clearGameState
  };
}; 