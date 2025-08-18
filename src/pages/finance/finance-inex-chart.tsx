import {
    Bar,
    BarChart,
    CartesianGrid,
    Tooltip,
    TooltipProps,
    XAxis,
} from "recharts"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

export const description = "A multiple bar chart"

type Data = {
    desktop: number
    mobile: number
    month: string
}

const chartData: Data[] = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Chiqim",
        color: "fill-rose-500/30 bg-rose-500/30",
    },
    mobile: {
        label: "Kirim",
        color: "fill-blue-500/30 bg-blue-500/30",
    },
} satisfies ChartConfig

export default function FinanceInExChart() {
    return (
        <Card className="p-0 select-none">
            <CardHeader className="">
                <div className="flex items-center text-xl gap-3 font-light">
                    <div className="flex items-center gap-2 hover:bg-secondary py-1 px-3 rounded-md cursor-pointer">
                        <span className="bg-blue-500/60 block w-4 h-4 rounded"></span>
                        <p>Kirim</p>
                    </div>
                    <div className="flex items-center gap-2 hover:bg-secondary py-1 px-3 rounded-md cursor-pointer">
                        <span className="bg-rose-500/60 block w-4 h-4 rounded"></span>
                        <p>Chiqim</p>
                    </div>
                </div>
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
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                            dataKey="mobile"
                            className={chartConfig.mobile.color}
                            radius={4}
                            stackId={"b"}
                        />
                        <Bar
                            dataKey="desktop"
                            className={chartConfig.desktop.color}
                            radius={4}
                            stackId={"a"}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip bg-secondary p-3 px-2 rounded-lg flex flex-col gap-2">
                <p className="label">{`Date: ${label}`}</p>
                {payload.map((entry, index) => (
                    <div
                        className="flex items-center gap-2 hover:bg-secondary py-1 px-3 rounded-md cursor-pointer"
                        key={`item-${index}`}
                    >
                        <span
                            className={cn(
                                "bg-blue-500/60 block w-4 h-4 rounded",
                                entry.className,
                            )}
                        ></span>
                        <p className="intro" style={{ color: entry.color }}>
                            {`${entry.name}: ${entry.value}`}
                        </p>
                    </div>
                ))}
            </div>
        )
    }
    return null
}
