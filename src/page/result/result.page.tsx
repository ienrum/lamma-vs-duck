'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import DeviationGraph from '@/src/widgets/deviation-graph/ui/standard-deviation-graph';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/src/app/utils/get-query-client';

const DynamicLeaderBoard = dynamic(() => import('@/src/widgets/leader-board/ui/leader-board'), {
  ssr: false,
});

const LeaderBoardFallback = () => (
  <div className="flex h-[60vh] w-full animate-pulse items-center justify-center rounded-lg bg-gray-100">
    <p className="font-medium text-gray-500">Loading...</p>
  </div>
);

const ResultPage = () => {
  const queryClient = getQueryClient();
  queryClient.invalidateQueries({ queryKey: ['deviation'] });
  queryClient.prefetchQuery({ queryKey: ['deviation'] });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LeaderBoardFallback />}>
          <DeviationGraph />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default ResultPage;
