import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "Yan", revenue: 4000 },
    { month: "Fev", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4500 },
    { month: "May", revenue: 6000 },
    { month: "Iyn", revenue: 5500 },
    { month: "Iyl", revenue: 7000 },
    { month: "Avg", revenue: 6500 },
    { month: "Sen", revenue: 8000 },
    { month: "Okt", revenue: 7500 },
    { month: "Noy", revenue: 9000 },
    { month: "Dek", revenue: 8500 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function BarChartLabel() {
    return (
        <ChartContainer config={chartConfig} className="w-full h-[400px]">
            <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                    top: 20,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="revenue" fill="var(--color-desktop)" radius={8}>
                    <LabelList
                        position="top"
                        offset={12}
                        className="fill-foreground"
                        fontSize={12}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    )
}
