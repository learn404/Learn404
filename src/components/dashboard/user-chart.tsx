"use client"

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { lessons: "lessonsPassed", number: 0, fill: "var(--color-lessonsPassed)" },
]

const chartConfig = {
  visitors: {
    label: "Lessons",
  },
  lessonsPassed: {
    label: "Hours Passed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


interface UserChartProps {
  lessonsCompleted: number | undefined;
  lessonsNumber: number;
}

export function UserChart( { lessonsCompleted, lessonsNumber }: UserChartProps) {

  if (lessonsCompleted) {
    chartData[0].number = lessonsCompleted;
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-[172px] w-auto h-[172px] mx-auto"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={(chartData[0].number / lessonsNumber) * 360}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="number" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {chartData[0].number.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 27}
                      className="fill-muted-foreground"
                    >
                      {chartData[0].number < 2 ? "cours terminé" : "cours terminés"}
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}
