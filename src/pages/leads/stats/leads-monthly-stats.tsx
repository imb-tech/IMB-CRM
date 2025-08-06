import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts"

import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"
import { ParamCombobox } from "@/components/as-params/combobox"
import { months } from "@/lib/utils"

export default function LeadsMonthlyStats() {
    const { pipeline, year, month } = useSearch({
        from: "__root__",
    })
    const yr = new Date().getFullYear()
    const { data } = useGet<LeadMonthly[]>("leads/common/trend-statistic", {
        params: {
            year: year ?? yr,
            month,
            pipeline,
        },
    })

    return (
        <Card className="hover:shadow-lg border-none">
            <CardHeader className="flex flex-row items-center gap-2">
                <CardTitle className="font-extralight flex-1">
                    Lidlar soni bo‘yicha trend
                </CardTitle>

                <ParamCombobox
                    // isSearch={false}
                    label="Oy"
                    labelKey="name"
                    valueKey="key"
                    options={months}
                    paramName="month"
                    addButtonProps={{
                        className: "min-w-[120px]",
                    }}
                />

                <ParamCombobox
                    isSearch={false}
                    label={yr.toString()}
                    labelKey="name"
                    valueKey="key"
                    addButtonProps={{
                        className: "min-w-[120px]",
                    }}
                    options={Array(10)
                        .fill(0)
                        .map((_, i) => ({
                            key: 2024 + i,
                            name: 2024 + i,
                        }))}
                    paramName="year"
                />
            </CardHeader>
            <CardContent className="p-0">
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 0,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="gray"
                            className="stroke-gray-400/30"
                        />
                        <XAxis
                            dataKey="key"
                            tickFormatter={(v) => v.toString().slice(0, 3)}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                            formatter={(value, name) => [
                                value,
                                name.toString(),
                            ]}
                            labelStyle={{
                                color: "hsl(var(--text-muted-foreground))",
                            }}
                            contentStyle={{
                                backgroundColor: "hsl(var(--background))",
                                borderRadius: "8px",
                                borderColor: "gray",
                            }}
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="count"
                            stackId="1"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.6}
                            name="Lidlar"
                        />
                        <Area
                            type="monotone"
                            dataKey="success_count"
                            stackId="2"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.6}
                            name="Muvaffaqiyatli yakunlandi"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
