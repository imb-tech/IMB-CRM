import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

const defaultData = [
    { month: "Yan", revenue: 4000, expenses: 500 },
    { month: "Fev", revenue: 3000, expenses: 1600 },
    { month: "Mar", revenue: 5000, expenses: 2700 },
    { month: "Apr", revenue: 4500, expenses: 2000 },
    { month: "May", revenue: 6000, expenses: 2900 },
    { month: "Iyn", revenue: 5500, expenses: 3400 },
    { month: "Iyl", revenue: 7000, expenses: 2700 },
    { month: "Avg", revenue: 6500, expenses: 4500 },
    { month: "Sen", revenue: 8000, expenses: 3300 },
    { month: "Okt", revenue: 7500, expenses: 4500 },
    { month: "Noy", revenue: 9000, expenses: 2400 },
    { month: "Dek", revenue: 8500, expenses: 3200 },
]
type Props = {
    data:
        | {
              month: string
              revenue: number
              expenses: number
          }[]
        | undefined
}

export function FinanceChart({ data = defaultData }: Props) {
    return (
        <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid vertical={false} opacity={0.3} />
                    <defs>
                        <linearGradient
                            id="revenue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#86efac"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="#86efac"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                        <linearGradient
                            id="expenses"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#fdba74"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="#fdba74"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="month"
                        axisLine={true}
                        tickLine={true}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <YAxis
                        axisLine={true}
                        tickLine={true}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "white",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow:
                                "0 10px 25px -5px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)",
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#86efac"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#revenue)"
                        name="Daromad"
                    />
                    <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke="#fdba74"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#expenses)"
                        name="Xarajat"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
