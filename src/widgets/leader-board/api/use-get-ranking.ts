'use client';

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Rank, RankResponseDto } from "@/src/widgets/leader-board/model/dto/rank.dto";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";

const PAGE_COUNT = 10;

const getRanking = async (gameId: string, pageParam: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/game/result?gameId=${gameId}&from=${pageParam}&to=${pageParam + PAGE_COUNT}`, {
    cache: 'no-store',
    method: 'GET',
  });
  const data = await response.json() as BaseResponseDto<Rank[]>;
  return data;
};

const useGetRanking = (gameId: string) => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["ranking", gameId],
    queryFn: ({ pageParam = 0 }) => getRanking(gameId, pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.length >= PAGE_COUNT ? pages.length + 1 : undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.data);
    },
  });

  return { rankList: data, isLoading, error, fetchNextPage, hasNextPage };
};

export default useGetRanking;
