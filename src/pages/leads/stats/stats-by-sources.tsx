import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useMemo, useRef } from "react"
import * as echarts from "echarts"
import { useIsMobile } from "@/hooks/use-mobile"

const fakeData = [
    { name: "Telegram", value: 648 },
    { name: "Instagram", value: 535 },
    { name: "YouTube", value: 580 },
    { name: "Facebook", value: 484 },
    { name: "Twitter", value: 370 },
]

const colorMap: Record<string, string | echarts.graphic.LinearGradient> = {
    website: "#3B82F6",
    instagram: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
        { offset: 0, color: "#fa7e1e" },
        { offset: 0.33, color: "#d62976" },
        { offset: 0.66, color: "#962fbf " },
        { offset: 1, color: "#4f5bd5 " },
    ]),
    telegram: "#0088cc",
    facebook: "#1877F2",
    tiktok: "#000000",
    phone_call: "#10B981",
    sms: "#6366F1",
    whatsapp: "#25D366",
    recommendation: "#F59E0B",
    event: "#EC4899",
    walk_in: "#EF4444",
    email: "#6366F1",
    youtube: "#FF0000",
    partner: "#14B8A6",
    other: "#9CA3AF",
    link: "#9CA3AF",
}

export default function StatsBySources({
    data,
    isFetching,
}: {
    data?: LeadStatSource[]
    isFetching?: boolean
}) {
    const isMobile = useIsMobile()
    const chartRef = useRef<HTMLDivElement>(null)

    const chartData = useMemo(() => {
        if (data && data.length > 0) {
            return data.map((item) => ({
                name: item.name,
                value: item.leads_count,
                icon: item.icon,
                itemStyle: {
                    color: colorMap[item.icon] || undefined,
                },
            }))
        } else {
            return fakeData
        }
    }, [data])

    const isNotEmpty = useMemo(
        () => data?.some((d) => d.leads_count > 0),
        [data],
    )

    const valueMap: Record<string, number> = {}
    chartData.forEach((item) => {
        valueMap[item.name] = item.value
    })

    useEffect(() => {
        if (!chartRef.current) return

        const myChart = echarts.init(chartRef.current, "dark")

        const option = {
            backgroundColor: "transparent",
            tooltip: {
                trigger: "item",
                formatter: "{b}: {c} ({d}%)",
                backgroundColor: "rgba(0,0,0,0.8)",
            },
            legend: {
                orient: "horizontal",
                left: "center",
                top: "bottom",
                padding: [30, 10, 0, 10],
                itemWidth: 14,
                itemHeight: 14,
                itemGap: 20,
            },
            series: [
                {
                    type: "pie",
                    radius: ["40%", "70%"],
                    center: [isMobile ? "50%" : "48%", "40%"],
                    data: chartData.map((item) => ({
                        ...item,
                        label: {
                            show: true,
                            position: "inside",
                            formatter: `{c}`,
                            color: "#fff",
                        },
                        emphasis: {
                            scale: true,
                            scaleSize: 15,
                        },
                    })),
                },
                {
                    type: "pie",
                    radius: ["40%", "70%"],
                    center: [isMobile ? "50%" : "48%", "40%"],
                    data: chartData.map((item) => ({
                        ...item,
                        label: {
                            show: !isMobile,
                            position: "outside",
                            fontSize: 14,
                        },
                        labelLine: {
                            show: !isMobile,
                        },
                    })),
                    silent: true,
                },
            ],
        }

        myChart.setOption(option)

        const handleResize = () => {
            myChart.resize()
        }
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            myChart.dispose()
        }
    }, [chartData, isMobile])

    return (
        <Card className="hover:shadow-lg border-none mb-4 relative h-full lg:col-span-5 ">
            <CardHeader>
                <CardTitle className="font-extralight">
                    {"Lid manbalari"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    ref={chartRef}
                    style={{ width: "100%", height: "400px" }}
                />
            </CardContent>
            {(!data?.length || !isNotEmpty) && !isFetching && (
                <div className="absolute inset-x-3 top-14 bottom-2 m-auto backdrop-blur-sm rounded-md border flex items-center justify-center">
                    <p className="text-orange-400">{"Ma'lumot yetarli emas"}</p>
                </div>
            )}
        </Card>
    )
}
