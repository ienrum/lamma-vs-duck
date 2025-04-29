'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PERCENTAGE_SENTENCE } from '../config/constants';
import { useGetDeviation } from '../api/use-get-deviation';
import Spinner from '@/components/ui/spinner';
import { useParams } from 'next/navigation';
import { ShareButtons } from '@/src/shared/ui/share-buttons';
import { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/src/shared/context/theme-provider';

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

// 커스텀 닷 컴포넌트
const CustomDot = ({
  cx,
  cy,
  index,
  userPointIndex,
  isDarkMode,
}: {
  cx?: number;
  cy?: number;
  index?: number;
  userPointIndex: number;
  isDarkMode: boolean;
}) => {
  if (cx && cy && index === userPointIndex) {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="var(--primary)"
          stroke={isDarkMode ? 'rgba(0,0,0,0.8)' : 'var(--card)'}
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
};

const DeviationGraph = ({ scoreFormatter }: { scoreFormatter: (score: number) => string }) => {
  const { gameId } = useParams();
  const { data, isLoading, error } = useGetDeviation(gameId as string);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

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
          {error?.message === 'No data' ? 'No today&apos;s data' : 'No data'}
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

  // 다크모드와 라이트모드에 따른 스타일 설정
  const gridStroke = isDarkMode ? 'rgba(255,255,255,0.1)' : 'var(--border)';
  const axisStroke = isDarkMode ? 'rgba(255,255,255,0.6)' : 'var(--muted-foreground)';
  const axisFill = isDarkMode ? 'rgba(255,255,255,0.8)' : undefined;

  const tooltipStyle = {
    backgroundColor: isDarkMode ? 'rgba(0,0,0,0.85)' : 'var(--card)',
    border: isDarkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: isDarkMode ? 'white' : 'var(--card-foreground)',
    boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.5)' : undefined,
  };

  return (
    <Card
      className={cn(
        'overflow-hidden rounded-2xl border-none',
        'pearl-shadow',
        isDarkMode
          ? ['bg-black/80 text-white', 'shadow-primary/10 shadow-xl']
          : ['glass-effect bg-card text-card-foreground', 'shadow-lg']
      )}
    >
      <CardContent className={cn('space-y-6 p-6', isDarkMode && 'dark:bg-black/70')}>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
              <XAxis
                dataKey="x"
                domain={[0, 100]}
                tickFormatter={(value) => value.toFixed(1)}
                stroke={axisStroke}
                strokeWidth={1}
                tick={{ fontSize: 12, fontWeight: 500, fill: axisFill }}
              />
              <YAxis
                tickFormatter={(value) => value.toFixed(2)}
                stroke={axisStroke}
                strokeWidth={1}
                tick={{ fontSize: 12, fontWeight: 500, fill: axisFill }}
              />
              <Tooltip
                formatter={(value: number) => [value.toFixed(3), 'Density']}
                labelFormatter={(label: any) => `Percentile: ${label.toFixed(1)}`}
                contentStyle={tooltipStyle}
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
                dot={(props: any) => <CustomDot {...props} userPointIndex={userPointIndex} isDarkMode={isDarkMode} />}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter
        className={cn(
          'flex flex-col gap-6 border-t px-6 py-8',
          isDarkMode ? 'border-white/10 bg-black/60' : 'border-border/30 bg-secondary/5'
        )}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <h3 className={cn('text-xl font-bold', isDarkMode && 'text-white')}>Today&apos;s Best Score</h3>
          <p className="text-primary text-2xl font-bold">{scoreFormatter(data?.myScore)}</p>
          <div className={cn('flex items-center gap-2', isDarkMode ? 'text-gray-400' : 'text-muted-foreground')}>
            <span>{PERCENTAGE_SENTENCE}</span>
            <span className={cn('font-bold', isDarkMode ? 'text-white' : 'text-foreground')}>
              {data?.myPercentage.toFixed(1)}%
            </span>
            <TrendingUp className="text-primary h-5 w-5" />
          </div>
        </div>
        <ShareButtons gameTitle="Lamma vs Duck" score={scoreFormatter(data?.myScore)} className="w-full" />
      </CardFooter>
    </Card>
  );
};

export default DeviationGraph;
