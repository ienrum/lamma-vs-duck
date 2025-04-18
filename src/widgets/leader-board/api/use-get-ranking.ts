'use client'

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { RankResponseDto } from "@/src/widgets/leader-board/model/dto/rank.dto";
import { BaseResponseDto } from "@/src/app/model/backend/base-dto";
import { BASE_URL } from "@/src/app/config/baseurl";
import { useState } from "react";
import { customFetchJson } from "@/src/shared/util/fetch-utils";

const PAGE_COUNT = 10;

const getRanking = (gameId: string, pageParam: number) => {
  return customFetchJson<BaseResponseDto<RankResponseDto>>(
    `${BASE_URL}/api/game/result?gameId=${gameId}&from=${pageParam}&to=${pageParam + PAGE_COUNT}`
  );
};

const useGetRanking = (gameId: string) => {
  const [myRank, setMyRank] = useState<number>(-1);

  const { data, isLoading, error, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["ranking", gameId],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await getRanking(gameId, pageParam);
      // myRank 값을 컴포넌트 상태로 관리
      if (result.data?.myRank !== undefined) {
        setMyRank(result.data.myRank);
      }
      return result;
    },
    getNextPageParam: (lastPage, pages) => {
      // 안전한 접근을 위해 옵셔널 체이닝 사용
      const rankListLength = lastPage.data?.rankList?.length || 0;
      return rankListLength > 0 && rankListLength >= PAGE_COUNT
        ? pages.length * PAGE_COUNT  // 현재 페이지 * 페이지 크기를 다음 시작점으로 사용
        : undefined;
    },
    initialPageParam: 0,
    select: (data) => {
      // 안전한 변환을 위해 옵셔널 체이닝과 기본값 사용
      return data.pages.flatMap((page) => page.data?.rankList || []);
    },
  });

  return {
    rankList: data || [],
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    myRank
  };
};

export default useGetRanking;
