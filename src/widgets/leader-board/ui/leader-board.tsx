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
import formatTime from '@/src/shared/util/format-time';

const LeaderBoard = () => {
  const { rankList, fetchNextPage } = useGetRanking('1');
  const { ref, isInView } = useInView();

  const today = new Date();
  const formattedDate = formatDate(today);

  useEffect(() => {
    if (isInView) {
      fetchNextPage();
    }
  }, [isInView, fetchNextPage]);

  return (
    <>
      <Card className="w-full rounded-lg bg-white p-6 shadow-lg">
        <CardHeader>
          <h1 className="text-center text-3xl font-bold text-gray-800">{LEADER_BOARD_TITLE}</h1>
        </CardHeader>
        <CardTitle className="text-center text-gray-800">
          <div className="text-gray-800">{formattedDate}</div>
        </CardTitle>
        <CardContent className="h-[60vh] overflow-y-scroll">
          <div className="grid w-full grid-cols-3 gap-4 rounded-lg p-4 font-semibold text-gray-700">
            <div>{LEADER_BOARD_RANK_TITLE}</div>
            <div>{LEADER_BOARD_NAME_TITLE}</div>
            <div>{LEADER_BOARD_SCORE_TITLE}</div>
          </div>
          {rankList.map((item, index) => (
            <div
              key={item.id}
              className={cn('grid w-full grid-cols-3 gap-4 rounded-lg p-4 transition-all hover:bg-gray-50')}
            >
              <div className="font-bold text-gray-700">{index + 1}</div>
              <div className="text-gray-800">{item.name}</div>
              <div className="text-gray-600">{formatTime(item.score)}</div>
            </div>
          ))}
          <div ref={ref as React.RefObject<HTMLDivElement>}></div>
        </CardContent>
      </Card>
    </>
  );
};

export default LeaderBoard;
