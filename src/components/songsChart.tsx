"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "A stacked bar chart with a legend";
const chartData = [
  { month: "January", play: 186, comment: 80 },
  { month: "February", play: 305, comment: 200 },
  { month: "March", play: 237, comment: 120 },
  { month: "April", play: 73, comment: 190 },
  { month: "May", play: 209, comment: 130 },
  { month: "June", play: 214, comment: 140 },
  { month: "July", play: 245, comment: 160 },
  { month: "August", play: 276, comment: 180 },
  { month: "September", play: 198, comment: 150 },
  { month: "October", play: 287, comment: 170 },
  { month: "November", play: 311, comment: 210 },
  { month: "December", play: 323, comment: 240 },
];
const chartConfig = {
  play: {
    label: "Play",
    // color: "hsl(var(--chart-1))",
    color: "#2662D9",
  },
  comment: {
    label: "Comment",
    // color: "hsl(var(--chart-2))",
    color: "#E23670",
  },
} satisfies ChartConfig;

function SongsChart() {
  return (
    <div className="w-full h-full">
      <Card className="bg-secondColorBg border-0 shadow-sm shadow-primaryColorBlue">
        <CardHeader>
          <CardTitle className="">Total plays and comments for the last 12 months</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />}/>
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
