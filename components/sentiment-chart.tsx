"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { SentimentSummary } from "@/lib/types"

export default function SentimentChart({ data }: { data: SentimentSummary }) {
  const chartData = [
    { name: "Positive", value: data.positive, color: "hsl(var(--positive))" },
    { name: "Neutral", value: data.neutral, color: "hsl(var(--neutral))" },
    { name: "Negative", value: data.negative, color: "hsl(var(--negative))" },
  ]

  return (
    <ChartContainer
      config={{
        positive: {
          label: "Positive",
          color: "hsl(var(--positive))",
        },
        neutral: {
          label: "Neutral",
          color: "hsl(var(--neutral))",
        },
        negative: {
          label: "Negative",
          color: "hsl(var(--negative))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={true}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

