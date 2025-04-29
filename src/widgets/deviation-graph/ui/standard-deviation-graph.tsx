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
      <div className="flex h-64 items-center justify-center">
        <Spinner className="text-primary h-8 w-8" />
      </div>
    );
  }

  if (error?.message === 'Failed to get rank') {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground text-center text-sm font-medium">
          If you want to record your score, please sign in.
        </p>
      </div>
    );
  }

  if (error?.message === 'No data' || !data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground text-center text-sm font-medium">
          {error?.message === 'No data' ? "No today's data" : 'No data'}
        </p>
      </div>
    );
  }

  const chartData = generateNormalDistribution(50, 15, 100);
  const userPosition = data?.myPercentage;

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

  return (
    <Card className="glass-effect pearl-shadow overflow-hidden rounded-2xl border-none">
      <CardContent className="space-y-6 p-6">
        <ChartContainer config={{ className: 'min-h-[300px]' }}>
          <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="x"
              domain={[0, 100]}
              tickFormatter={(value) => value.toFixed(1)}
              stroke="var(--muted-foreground)"
              strokeWidth={1}
              tick={{ fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              tickFormatter={(value) => value.toFixed(2)}
              stroke="var(--muted-foreground)"
              strokeWidth={1}
              tick={{ fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip
              formatter={(value: number) => [value.toFixed(3), 'Density']}
              labelFormatter={(label) => `Percentile: ${label.toFixed(1)}`}
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            />
            <Line
              type="monotone"
              dataKey="y"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: 'var(--primary)' }}
            />
            <Line
              type="monotone"
              dataKey="y"
              stroke="transparent"
              dot={({ cx, cy, index }) => {
                if (index === userPointIndex) {
                  return (
                    <g>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={6}
                        fill="var(--primary)"
                        stroke="var(--card)"
                        strokeWidth={2}
                        className="animate-pulse-slow"
                      />
                      <text x={cx} y={cy - 16} textAnchor="middle" fill="var(--primary)" className="text-sm font-bold">
                        You
                      </text>
                    </g>
                  );
                }
                return null;
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="bg-secondary/5 flex flex-col gap-6 border-t px-6 py-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <h3 className="text-xl font-bold">Today's Best Score</h3>
          <p className="text-primary text-2xl font-bold">{scoreFormatter(data?.myScore)}</p>
          <div className="text-muted-foreground flex items-center gap-2">
            <span>{PERCENTAGE_SENTENCE}</span>
            <span className="text-foreground font-bold">{data?.myPercentage.toFixed(1)}%</span>
            <TrendingUp className="text-primary h-5 w-5" />
          </div>
        </div>
        <ShareButtons gameTitle="Lamma vs Duck" score={scoreFormatter(data?.myScore)} className="w-full" />
      </CardFooter>
    </Card>
  );
};

export default DeviationGraph;
