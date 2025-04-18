import { useSuspenseQuery } from "@tanstack/react-query";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";
import { GameBoardResponseDto } from "@/src/features/game/model/dto/game-board.dto";
import { BASE_URL } from "@/src/app/config/baseurl";
import { customFetchJson } from "@/src/shared/util/fetch-utils";

const getGameBoard = async (gameId: number) => {
  return await customFetchJson<BaseResponseDto<GameBoardResponseDto>>(
    `${BASE_URL}/api/game/board?gameId=${gameId}`
  );
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