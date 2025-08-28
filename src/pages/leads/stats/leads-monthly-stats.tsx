import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import { ParamCombobox } from "@/components/as-params/combobox"
import { months } from "@/constants/utils"

export default function LeadsMonthlyStats() {
    const { pipeline, year, month, worker } = useSearch({
        from: "__root__",
    })
    const yr = new Date().getFullYear()

    const { data: dataChart, isSuccess } = useGet<LeadMonthly[]>(
        "leads/common/trend-statistic",
        {
            params: {
                year: year ?? yr,
                month,
                pipeline,
                worker,
            },
        },
    )

    const { data: dataSeller, isSuccess: isSuccessSeller } = useGet<any[]>(
        "leads/common/agents",
    )

    const isStacked = isSuccess && dataChart?.length > 12

    const bars = [
        {
            key: "total",
            name: "Lidlar",
            color: "#3b82f6",
        },
        {
            key: "success",
            name: "Erishildi",
            color: "#10b981",
        },
        {
            key: "loosed",
            name: "Yo'qotildi",
            color: "#ef4444",
        },
    ]

    return (
        <Card className="mt-4">
            <CardHeader className="flex md:flex-row items-center gap-2">
                <CardTitle className="font-extralight flex-1">
                    {"Lidlar soni bo‘yicha trend"}
                </CardTitle>
                <ParamCombobox
                    // isSearch={false}
                    label={"Sotuvchilar"}
                    labelKey="name"
                    valueKey="key"
                    options={
                        (isSuccessSeller &&
                            dataSeller?.map((item) => ({
                                key: item.id,
                                name: `${item.first_name} ${item.last_name} ${
                                    item.middle_name || ""
                                }`,
                            }))) ||
                        []
                    }
                    paramName="worker"
                    className="w-full"
                    addButtonProps={{
                        className: "min-w-[200px] md:w-max w-full",
                    }}
                />

                <ParamCombobox
                    // isSearch={false}
                    label={"Oy"}
                    labelKey="name"
                    valueKey="key"
                    options={months}
                    paramName="month"
                    addButtonProps={{
                        className: "min-w-[120px] md:w-max w-full",
                    }}
                />

                <ParamCombobox
                    isSearch={false}
                    label={yr.toString()}
                    labelKey="name"
                    valueKey="key"
                    addButtonProps={{
                        className: "min-w-[120px] md:w-max w-full",
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

            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                        data={dataChart}
                        margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            strokeOpacity={0.2}
                        />
                        <XAxis
                            dataKey="key"
                            tick={{ fontSize: 12, fill: "currentColor" }}
                        />
                        <YAxis tick={{ fontSize: 12, fill: "currentColor" }} />
                        <Tooltip
                            cursor={{ fill: "rgba(100, 100, 100, 0.2)" }}
                            formatter={(value, name) => [
                                value,
                                name.toString(),
                            ]}
                            contentStyle={{
                                backgroundColor: "hsl(var(--background) / 0.9)",
                                borderRadius: "8px",
                                borderColor: "hsl(var(--border))",
                                backdropFilter: "blur(4px)",
                            }}
                            labelStyle={{
                                color: "hsl(var(--text-muted-foreground))",
                            }}
                        />
                        <Legend content={<CustomLegendContent />} />
                        {bars.map((bar) => (
                            <Bar
                                key={bar.key}
                                dataKey={bar.key}
                                fill={bar.color}
                                name={bar.name}
                                barSize={17}
                                {...(isStacked ? { stackId: "a" } : {})}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

type CustomLegendContentProps = {
    payload?: any[]
}

const CustomLegendContent = ({ payload }: CustomLegendContentProps) => {
    return (
        <ul className="flex gap-4 justify-center mt-4">
            {payload?.map((entry, index) => (
                <li key={`item-${index}`} className="flex items-center gap-2">
                    <span
                        className="w-4 h-4 rounded-lg"
                        style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="text-sm">{entry.value}</span>
                </li>
            ))}
        </ul>
    )
}
