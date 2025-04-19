'use client'

import { BaseResponseDto } from "@/src/app/model/backend/base-dto";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GameListResponseDto } from "@/src/features/game/model/dto/game-list.dto";
import { BASE_URL } from "@/src/app/config/baseurl";
import { customFetchJson } from "@/src/shared/util/fetch-utils";

const getGameList = async () => {
  return await customFetchJson<BaseResponseDto<GameListResponseDto>>(`${BASE_URL}/api/game/list`);
};

const useGetGameList = () => {
  return useSuspenseQuery({
    queryKey: ['gameList'],
    queryFn: () => getGameList(),
    select: (data) => data.data
  });
};

export default useGetGameList;
