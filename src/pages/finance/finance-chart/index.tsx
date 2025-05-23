import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChartData, ChartProps } from "./chart"
import { ChartHeader } from "./chart-header"
import { ChartItem } from "./chart-item"

const defaultData: ChartData[] = [
    { name: "Ish haqi", value: 45, color: "#06b6d4" },
    { name: "Marketing", value: 10, color: "#8b5cf6" },
    { name: "Oylik", value: 15, color: "#EC4899" },
    { name: "Jihozlar", value: 15, color: "#f59e0b" },
    { name: "Binolar", value: 10, color: "#ef4444" },
    { name: "Boshqa", value: 5, color: "#10b981" },
]

export default function FinancePieChart({
    data = defaultData,
    title = "Xarajatlar Taqsimoti",
    className,
}: ChartProps) {
    const [activeIndex, setActiveIndex] = React.useState<number>(0)

    const handleHover = React.useCallback((index: number) => {
        setActiveIndex(index)
    }, [])

    const handleClick = React.useCallback((index: number) => {
        setActiveIndex(index)
    }, [])

    return (
        <Card className={cn("w-full bg-card shadow-none", className)}>
            <CardContent className="p-4">
                <ChartHeader title={title} />
                <div className="relative mt-6 flex flex-col items-center sm:flex-row sm:items-start md:flex-col md:items-center gap-6">
                    <div className="relative h-[240px] w-[240px]">
                        <PieChart width={240} height={240}>
                            <Pie
                                activeIndex={activeIndex}
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={120}
                                paddingAngle={0.5}
                                cornerRadius={6}
                                dataKey="value"
                                onMouseEnter={(_, index) => handleHover(index)}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        opacity={
                                            activeIndex === index ? 1 : 0.7
                                        }
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <span className="text-2xl font-semibold">
                                {data[activeIndex]?.value}%
                            </span>
                            <p className="text-sm text-muted-foreground">
                                {data[activeIndex]?.name}
                            </p>
                        </div>
                    </div>
                    <div className="grid w-full grid-cols-2 gap-1 lg:max-w-md">
                        {data.map((item, index) => (
                            <ChartItem
                                key={index}
                                item={item}
                                index={index}
                                isActive={activeIndex === index}
                                onHover={handleHover}
                                onClick={handleClick}
                            />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
