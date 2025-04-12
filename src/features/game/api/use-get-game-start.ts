import { useQuery } from "@tanstack/react-query";
import { GameStartResponseDto } from "@/src/features/game/model/dto/game-start.dto";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";

const getStart = async (): Promise<BaseResponseDto<GameStartResponseDto>> => {
  const response = await fetch("/api/game/start", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<BaseResponseDto<GameStartResponseDto>>;
};

const useGetStart = () => {
  return useQuery({
    queryKey: ['gameStart'],
    queryFn: () => getStart(),
  });
};

export default useGetStart;  