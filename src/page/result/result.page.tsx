'use client';

import { Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import DeviationGraph from '@/src/widgets/deviation-graph/ui/standard-deviation-graph';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/src/app/utils/get-query-client';
import { ShareButton } from '@/src/widgets/share-button/ui/share-button';
import { useUser } from '@/src/shared/api/use-user';
import formatTime from '@/src/shared/util/format-time';
import { useParams } from 'next/navigation';

const DynamicLeaderBoard = dynamic(() => import('@/src/widgets/leader-board/ui/leader-board'), {
  ssr: false,
});

const LeaderBoardFallback = () => (
  <div className="flex h-[60vh] w-full animate-pulse items-center justify-center rounded-lg bg-gray-100">
    <p className="font-medium text-gray-500">Loading...</p>
  </div>
);

const ResultPage = () => {
  const { gameId } = useParams();
  const graphRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const queryClient = getQueryClient();
  queryClient.invalidateQueries({ queryKey: ['deviation'] });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="relative w-full">
          <div ref={graphRef} className="rounded-lg bg-white p-4">
            {!user && <p className="text-gray-500">sign in to see your result</p>}
            {!!user && (
              <Suspense fallback={<LeaderBoardFallback />}>
                <DeviationGraph scoreFormatter={gameId === '1' ? formatTime : (score: number) => score.toString()} />
              </Suspense>
            )}
          </div>
          {!!user && <ShareButton targetRef={graphRef} />}
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default ResultPage;
