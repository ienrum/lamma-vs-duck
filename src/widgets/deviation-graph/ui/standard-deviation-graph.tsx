'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';

import { Card, CardContent, CardFooter } from '@/src/shared/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { PERCENTAGE_SENTENCE } from '../config/constants';
import { useGetDeviation } from '../api/use-get-deviation';

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

const DeviationGraph = () => {
  const { data, isLoading, error } = useGetDeviation();

  console.log(error);
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
    <Card>
      <CardContent>
        <ChartContainer config={{}}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" domain={[0, 100]} tickFormatter={(value) => value.toFixed(1)} />
            <YAxis tickFormatter={(value) => value.toFixed(1)} />
            <Tooltip
              formatter={(value: number) => [value.toFixed(1), 'Density']}
              labelFormatter={(label) => `Score: ${label.toFixed(1)}`}
            />
            <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
            <Line
              type="monotone"
              dataKey="y"
              stroke="transparent"
              dot={({ cx, cy, index }) => {
                if (index === userPointIndex) {
                  return (
                    <g>
                      <circle cx={cx} cy={cy} r={6} fill="red" />
                      <text x={cx} y={cy - 10} textAnchor="middle" fill="red" style={{ fontWeight: 'bold' }}>
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {PERCENTAGE_SENTENCE} {data?.myPercentage.toFixed(1)}% <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default DeviationGraph;
