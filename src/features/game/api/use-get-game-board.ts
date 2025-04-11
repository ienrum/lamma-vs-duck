import { useSuspenseQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";
import { GameBoardResponseDto } from "@/src/features/game/model/dto/game-board.dto";

const getGameBoard = async (gameId: number) => {
  const response = await fetch(`/api/game/board?gameId=${gameId}`);
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