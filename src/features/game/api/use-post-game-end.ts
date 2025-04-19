import { GameEndRequestDto, GameEndResponseDto } from "@/src/features/game/model/dto/game-end.dto";
import { useMutation } from "@tanstack/react-query";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";
import { BASE_URL } from "@/src/app/config/baseurl";
import { customFetchJson } from "@/src/shared/util/fetch-utils";

const postEnd = async (data: GameEndRequestDto): Promise<BaseResponseDto<GameEndResponseDto>> => {
  return await customFetchJson<BaseResponseDto<GameEndResponseDto>>(`${BASE_URL}/api/game/end`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const usePostEnd = () => {
  return useMutation({
    mutationFn: (data: GameEndRequestDto) => postEnd(data),
  });
};

export default usePostEnd;    