'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { PERCENTAGE_SENTENCE } from '../config/constants';
import { useGetDeviation } from '../api/use-get-deviation';
import Spinner from '@/components/ui/spinner';
import { useParams } from 'next/navigation';
import { ShareButtons } from '@/src/shared/ui/share-buttons';

// 정규분포 데이터 생성 함수
const generateNormalDistribution = (mean: number, stdDev: number, points: number) => {
  const data = [];
  const step = 100 / points;

  for (let i = 0; i <= 100; i += step) {
    const x = i;
    const y = Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))) / (stdDev * Math.sqrt(2 * Math.PI));
    data.push({ x, y });
  }

  return data;
};

const DeviationGraph = ({ scoreFormatter }: { scoreFormatter: (score: number) => string }) => {
  const { gameId } = useParams();
  const { data, isLoading, error } = useGetDeviation(gameId as string);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (error?.message === 'Failed to get rank') {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-center text-sm font-medium text-gray-500">
          If you want to record your score, please sign in.
        </p>
      </div>
    );
  } else if (error?.message === 'No data') {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-center text-sm font-medium text-gray-500">No today&apos;s data</p>
      </div>
    );
  } else if (!data) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-center text-sm font-medium text-gray-500">No data</p>
      </div>
    );
  }

  // 정규분포 데이터 생성 (평균 50, 표준편차 15)
  const chartData = generateNormalDistribution(50, 15, 100);

  // 사용자의 위치 계산 (백분위를 IQ 스케일로 변환)
  const userPosition = data?.myPercentage;
  // 사용자 위치에 가장 가까운 데이터 포인트 찾기
  const findClosestPoint = () => {
    let closestIndex = 0;
    let minDiff = Infinity;

    chartData.forEach((point, index) => {
      const diff = Math.abs(point.x - userPosition);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  const userPointIndex = findClosestPoint();
  const userPoint = chartData[userPointIndex];

  return (
    <Card className="bg-white shadow-lg">
      <CardContent>
        <ChartContainer config={{}}>
          <LineChart
            data={chartData}
            margin={{
              top: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="x"
              domain={[0, 100]}
              tickFormatter={(value) => value.toFixed(1)}
              stroke="#9ca3af"
              strokeWidth={1}
              tick={{ fontSize: 12, fontWeight: 400 }}
            />
            <YAxis
              tickFormatter={(value) => value.toFixed(1)}
              stroke="#9ca3af"
              strokeWidth={1}
              tick={{ fontSize: 12, fontWeight: 400 }}
            />
            <Tooltip
              formatter={(value: number) => [value.toFixed(1), 'Density']}
              labelFormatter={(label) => `Score: ${label.toFixed(1)}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                padding: '8px 12px',
                fontSize: '13px',
                fontWeight: 400,
              }}
            />
            <Line type="monotone" dataKey="y" stroke="#4b5563" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
            <Line
              type="monotone"
              dataKey="y"
              stroke="transparent"
              dot={({ cx, cy, index }) => {
                if (index === userPointIndex) {
                  return (
                    <g>
                      <circle cx={cx} cy={cy} r={6} fill="#374151" stroke="white" strokeWidth={1.5} />
                      <text
                        x={cx}
                        y={cy - 14}
                        textAnchor="middle"
                        fill="#374151"
                        style={{
                          fontWeight: 500,
                          fontSize: '13px',
                          textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                        }}
                      >
                        You
                      </text>
                    </g>
                  );
                }
                return <g />;
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2 text-base font-medium text-gray-700">
            <span className="text-gray-900">today&apos;s best score: {scoreFormatter(data?.myScore)}</span>
            <div className="flex items-center gap-2">
              {PERCENTAGE_SENTENCE} <span className="text-gray-900">{data?.myPercentage.toFixed(1)}%</span>
              <TrendingUp className="h-5 w-5 text-gray-600" />
            </div>
          </div>
          <ShareButtons gameTitle="Lamma vs Duck" score={scoreFormatter(data?.myScore)} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default DeviationGraph;
