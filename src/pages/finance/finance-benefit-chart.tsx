import { CartesianGrid, XAxis, Area, AreaChart } from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "A line chart with dots"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export default function FinanceBenefitChart() {
  return (
    <Card className="p-0">
      <CardHeader className="">
        <div className="flex items-center text-xl gap-3 font-light">
          <div className="flex items-center gap-2 hover:bg-secondary py-1 px-3 rounded-md cursor-pointer">
            <span className="bg-green-500/60 block w-4 h-4 rounded"></span>
            <p>Foyda</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="fillGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel className="p-3 bg-secondary" />} />
            <Area
              dataKey="desktop"
              type="natural"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#fillGreen)"
              dot={{
                fill: "#22c55e",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                fill: "#22c55e",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
