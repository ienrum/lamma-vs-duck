import { GameEndRequestDto, GameEndResponseDto } from "@/src/features/game/model/dto/game-end.dto";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";

const postEnd = async (data: GameEndRequestDto): Promise<BaseResponseDto<GameEndResponseDto>> => {
  const response = await fetch("/api/game/end", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to post game end");
  }

  return response.json();
};

const usePostEnd = () => {
  return useMutation({
    mutationFn: (data: GameEndRequestDto) => postEnd(data),
  });
};

export default usePostEnd;    