'use client';

import { useSuspenseQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";
import { GameBoardResponseDto } from "@/src/features/game/model/dto/game-board.dto";

const getGameBoard = async (gameId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/game/board?gameId=${gameId}`, {
    method: 'GET',
  });
  const data = await response.json() as BaseResponseDto<GameBoardResponseDto>;
  return data;
};

const useGetGameBoard = (gameId: number) => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ['gameBoard', gameId],
    queryFn: () => getGameBoard(gameId),
  });

  return {
    data: data.data,
    isLoading,
    error,
  };
};

export default useGetGameBoard;