import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { RankingResponse, mockRankingResponse } from "../model/ranking-response";

const getRanking = async () => {
  const response = await new Promise<RankingResponse>((resolve) => {
    setTimeout(() => {
      resolve(mockRankingResponse);
    }, 1000);
  });
  return response;
};

const useGetRanking = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["ranking"],
    queryFn: () => getRanking(),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.length >= 10 ? pages.length + 1 : undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      return data.pages.flatMap((page) => page.data);
    },
  });

  return { data, isLoading, error, fetchNextPage, hasNextPage };
};

export default useGetRanking;
