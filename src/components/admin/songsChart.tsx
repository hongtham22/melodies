"use client";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart configuration
const chartConfig = {
  play: {
    label: "Play",
    color: "#2662D9",
  },
  comment: {
    label: "Comment",
    color: "#E23670",
  },
} satisfies ChartConfig;

interface Data {
  month: string;
  year: number;
  totalPlay: number;
  totalComment: number;
}

interface SongsChartProps {
  data: Data[];
}

function SongsChart({ data }: SongsChartProps) {
  const [chartData, setChartData] = useState<{ month: string; play: number; comment: number }[]>([]);

  useEffect(() => {
    const transformedData = data.map((item) => ({
      month: item.month,
      play: item.totalPlay,
      comment: item.totalComment,
    })).reverse();
    setChartData(transformedData);
  }, [data]);

  return (
    <div className="w-full h-full">
      <Card className="bg-secondColorBg border-0 shadow-sm shadow-primaryColorBlue">
        <CardHeader>
          <CardTitle>Total plays and comments for the last 12 months</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)} // Lấy 3 ký tự đầu của tháng
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="play"
                stackId="a"
                fill="var(--color-play)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="comment"
                stackId="a"
                fill="var(--color-comment)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default SongsChart;
