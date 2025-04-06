"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/src/shared/ui/card"
import {
  ChartContainer,
} from "@/components/ui/chart"
import { PERCENTAGE_SENTENCE } from "../config/constants"
import { useGetDeviation } from "../api/use-get-deviation"

const DeviationGraph = () => {
  const { data: { timeData, myTime, total } } = useGetDeviation();

  const chartData = Array.from({ length: timeData.length }, (_, i) => ({
    time: timeData[i].time,
    value: timeData[i].value,
  }));

  const activeIndex = chartData.findIndex((item) => item.time === myTime);
  const myRank = timeData.findIndex((item) => item.time === myTime);
  const myPercentage = (myRank / total) * 100;

  return (
    <Card>
      <CardContent>
        <ChartContainer config={{}}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toString()}
            />
            <Line type="monotone" dataKey="value" stroke="black"
              dot={
                (props) => {
                  const { cx, cy, index } = props;

                  if (index === activeIndex) {
                    return (
                      <>
                        <circle cx={cx} cy={cy} r={3} fill="red" stroke="red" />
                        <text x={cx} y={cy - 10} textAnchor="middle" fill="red" style={{ fontWeight: "bold" }}>my rank</text>
                      </>
                    )
                  }

                  return <circle cx={cx} cy={cy} r={2} fill="black" stroke="black" />
                }
              }
              activeDot={{
                r: 6,
                fill: "transparent",
                stroke: "red",
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {PERCENTAGE_SENTENCE} {myPercentage.toFixed(1)}% <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}

export default DeviationGraph;
