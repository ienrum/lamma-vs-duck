'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useGetRanking from '../api/use-get-ranking';
import { cn } from '@/lib/utils';
import useInView from '@/src/shared/hook/use-intersection';
import { useEffect } from 'react';
import formatDate from '@/src/shared/util/format-date';
import {
  LEADER_BOARD_TITLE,
  LEADER_BOARD_RANK_TITLE,
  LEADER_BOARD_NAME_TITLE,
  LEADER_BOARD_SCORE_TITLE,
} from '../config/constants';

const LeaderBoard = ({
  gameId,
  scoreFormatter,
  order,
}: {
  gameId: string;
  scoreFormatter: (score: number) => string;
  order: 'asc' | 'desc';
}) => {
  const { rankList, fetchNextPage } = useGetRanking(gameId, order);
  const { ref, isInView } = useInView();
  const today = new Date();
  const formattedDate = formatDate(today);

  console.log(rankList);

  useEffect(() => {
    if (isInView) {
      fetchNextPage();
    }
  }, [isInView, fetchNextPage]);

  return (
    <Card className="glass-effect pearl-shadow overflow-hidden rounded-2xl border-none">
      <CardHeader className="bg-primary/5 space-y-2 border-b px-6 py-8">
        <CardTitle className="text-center text-3xl font-bold">{LEADER_BOARD_TITLE}</CardTitle>
        <p className="text-muted-foreground text-center">{formattedDate}</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-secondary/5 text-muted-foreground grid grid-cols-3 gap-4 border-b p-4 text-sm font-semibold">
          <div>{LEADER_BOARD_RANK_TITLE}</div>
          <div>{LEADER_BOARD_NAME_TITLE}</div>
          <div>{LEADER_BOARD_SCORE_TITLE}</div>
        </div>
        <div className="h-[60vh] overflow-y-auto">
          {rankList.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                'grid grid-cols-3 gap-4 p-4 transition-all',
                'hover:bg-secondary/5',
                index === 0 && 'bg-primary/5 font-bold',
                index === 1 && 'bg-primary/3 font-semibold',
                index === 2 && 'bg-primary/2'
              )}
            >
              <div className="flex items-center gap-2">
                {index < 3 ? (
                  <span className="bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-full">
                    {index + 1}
                  </span>
                ) : (
                  <span className="text-muted-foreground">{index + 1}</span>
                )}
              </div>
              <div className="truncate">{item.name}</div>
              <div className="text-muted-foreground">{scoreFormatter(item.score ?? 0)}</div>
            </div>
          ))}
          <div ref={ref as React.RefObject<HTMLDivElement>} />
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderBoard;
