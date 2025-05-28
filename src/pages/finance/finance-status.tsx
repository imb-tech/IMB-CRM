import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
const chartData = [
    { browser: "safari", visitors: 7000000, fill: "var(--color-safari)" },
]
type Props = {}

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

function FinanceStatus({}: Props) {
    return (
        <Card>
            <CardContent>
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    To'lov Holati
                </h2>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={250}
                        innerRadius={100}
                        outerRadius={150}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[110, 90]}
                        />
                        <RadialBar
                            dataKey="visitors"
                            background
                            cornerRadius={10}
                        />
                        <PolarRadiusAxis
                            tick={false}
                            tickLine={false}
                            axisLine={false}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
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
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {chartData[0].visitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Kutilayotgan summa
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="font-medium text-sm text-gray-700">
                                    To'langan Summa
                                </span>
                            </div>
                            <span className="text-lg font-bold text-green-600">
                                4 800 000
                            </span>
                        </div>
                        <div className="bg-green-100/70 dark:bg-green-900/30 rounded-xl p-4 border border-green-400">
                            <div className="text-sm text-green-700">
                                Jami to'lovlarning 64.7%
                            </div>
                            <div className="text-xs text-emerald-600 mt-1">
                                O'tgan davrga nisbatan +5.2%
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="font-medium text-sm text-gray-700">
                                    Kutilayotgan Summa
                                </span>
                            </div>
                            <span className="text-lg font-bold text-orange-600">
                                7 000 000
                            </span>
                        </div>
                        <div className="bg-orange-100/70 dark:bg-orange-900/30 rounded-xl p-4 border border-orange-400">
                            <div className="text-sm text-orange-700">
                                Jami to'lovlarning 35.3%
                            </div>
                            <div className="text-xs text-orange-600 mt-1">
                                O'tgan davrga nisbatan -2.1%
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default FinanceStatus
