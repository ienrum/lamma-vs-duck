'use client';

import { Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import DeviationGraph from '@/src/widgets/deviation-graph/ui/standard-deviation-graph';
import { dehydrate, HydrationBoundary, useQueryClient } from '@tanstack/react-query';
import { getQueryClient } from '@/src/app/utils/get-query-client';
import { ShareButton } from '@/src/widgets/share-button/ui/share-button';
import { useUser } from '@/src/shared/api/use-user';
import formatTime from '@/src/shared/util/format-time';
import { useParams } from 'next/navigation';
import LeaderBoard from '@/src/widgets/leader-board/ui/leader-board';

const LeaderBoardFallback = () => (
  <div className="flex h-[60vh] w-full animate-pulse items-center justify-center rounded-lg bg-gray-100">
    <p className="font-medium text-gray-500">Loading...</p>
  </div>
);

const ResultPage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const graphRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const gameTitle = gameId === '1' ? 'Lamma vs Duck' : 'Greedy Bee';
  const scoreFormatter = gameId === '1' ? formatTime : (score: number) => score.toString();
  const order = gameId === '1' ? 'asc' : 'desc';

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
      <div className="relative flex w-full flex-col items-center justify-center gap-4">
        <p className="text-sm text-gray-500">{gameTitle}</p>
        <div ref={graphRef}>
          {!user && <p className="text-gray-500">sign in to see your result</p>}
          {!!user && (
            <Suspense fallback={<LeaderBoardFallback />}>
              <DeviationGraph scoreFormatter={scoreFormatter} />
            </Suspense>
          )}
        </div>
        <LeaderBoard gameId={gameId} scoreFormatter={scoreFormatter} order={order} />
      </div>
    </div>
  );
};

export default ResultPage;
