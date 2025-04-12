import { useMutation } from "@tanstack/react-query";
import { GameStartRequestDto } from "@/src/features/game/model/dto/game-start.dto";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";

const postStart = async (data: GameStartRequestDto): Promise<BaseResponseDto<null>> => {
  const response = await fetch("/api/game/start", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

const usePostStart = () => {
  return useMutation({
    mutationFn: (data: GameStartRequestDto) => postStart(data),
  });
};

export default usePostStart;  