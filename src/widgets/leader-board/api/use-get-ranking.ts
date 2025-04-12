import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { RankResponseDto } from "@/src/widgets/leader-board/model/dto/rank.dto";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";

const PAGE_COUNT = 10;

let myRank: number;

const getRanking = async (gameId: string, pageParam: number) => {
  const response = await fetch(`/api/game/result?gameId=${gameId}&from=${pageParam}&to=${pageParam + PAGE_COUNT}`);
  const data = await response.json() as BaseResponseDto<RankResponseDto>;
  myRank = data.data.myRank;
  return data;
};

const useGetRanking = (gameId: string) => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["ranking", gameId],
    queryFn: ({ pageParam = 0 }) => getRanking(gameId, pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.rankList.length >= PAGE_COUNT ? pages.length + 1 : undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.data.rankList);
    },
  });

  return { rankList: data, isLoading, error, fetchNextPage, hasNextPage, myRank };
};

export default useGetRanking;
