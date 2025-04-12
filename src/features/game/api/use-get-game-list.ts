'use client';

import { BaseResponseDto } from "@/src/app/model/backend/base-dto";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GameListResponseDto } from "@/src/features/game/model/dto/game-list.dto";

const getGameList = async () => {
  const response = await fetch('/api/game/list', {
    method: 'GET',
  });
  const data = await response.json() as BaseResponseDto<GameListResponseDto>;
  return data;
};

const useGetGameList = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ['gameList'],
    queryFn: () => getGameList(),
  });

  return {
    data: data.data,
    isLoading,
    error,
  };
};

export default useGetGameList;
