'use client';

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Rank, RankResponseDto } from "@/src/widgets/leader-board/model/dto/rank.dto";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";

const PAGE_COUNT = 10;

export const getRanking = async (gameId: string, pageParam: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/game/result?gameId=${gameId}&from=${pageParam}&to=${pageParam + PAGE_COUNT - 1}`, {
    cache: 'no-store',
    method: 'GET',
  });
  const data = await response.json() as BaseResponseDto<Rank[]>;
  return data;
};

const useGetRanking = (gameId: string) => {
  const { data, isLoading, error, fetchNextPage, hasNextPage, refetch } = useSuspenseInfiniteQuery({
    queryKey: ["ranking", gameId],
    queryFn: ({ pageParam = 0 }) => getRanking(gameId, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < PAGE_COUNT) {
        return undefined;
      }
      return allPages.length * PAGE_COUNT;
    },
    initialPageParam: 0,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      flatData: data.pages.flatMap((page) => page.data)
    }),
  });

  return {
    rankList: data?.flatData || [],
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch
  };
};

export default useGetRanking;
