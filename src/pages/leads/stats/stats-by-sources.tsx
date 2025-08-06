import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GetSourceIcon, { leadSources } from "../sources/get-source-icon"
import { useMemo } from "react"
import { cn } from "@/lib/utils"
import LeadsMonthlyStats from "./leads-monthly-stats"
import { Skeleton } from "@/components/ui/skeleton"

export const description = "A bar chart with a custom label"

export default function StatsBySources({
    data,
    isFetching,
}: {
    data?: LeadStatSource[]
    isFetching?: boolean
}) {
    const isNotEmpty = useMemo(
        () => data?.some((d) => d.leads_count > 0),
        [data, isFetching],
    )

    const list = useMemo(() => {
        const fakeD = Array(4)
            .fill(0)
            ?.map((_, i) => ({
                id: i,
                name: leadSources[i].label,
                icon: leadSources[i].key,
                leads_count: Math.floor(Math.random() * 100),
            }))

        const d = isNotEmpty ? data : fakeD

        const fully = d?.reduce((acc, cur) => (acc += cur.leads_count), 0) ?? 1

        return (
            d
                ?.map((el) => ({
                    ...el,
                    percentage: Math.floor((el.leads_count * 100) / fully),
                }))
                ?.sort((a, b) => b.leads_count - a.leads_count) ?? []
        )
    }, [data, isNotEmpty])

    return (
        <div className="lg:col-span-2">
            <Card className="hover:shadow-lg border-none mb-4 relative">
                <CardHeader>
                    <CardTitle className="font-extralight">
                        Lid manbalariƒ
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2 px-2">
                        {list?.map((src) => (
                            <div
                                key={src.id}
                                className="flex items-center gap-2"
                            >
                                <div className="flex items-center gap-2 min-w-[120px]">
                                    <GetSourceIcon
                                        icon={src.icon}
                                        size={16}
                                        className="bg-transparent"
                                    />
                                    <div className="text-sm">{src.name}</div>
                                </div>
                                <div className="w-full">
                                    {isFetching ?
                                        <Skeleton
                                            className="h-10"
                                            style={{
                                                width: `${src.percentage ?? 0}%`,
                                            }}
                                        />
                                    :   <div
                                            className={cn(
                                                "p-2 rounded-sm text-sm text-end",
                                                src.leads_count > 0 ?
                                                    "bg-blue-500 pr-3"
                                                :   "",
                                            )}
                                            style={{
                                                width: `${src.percentage ?? 0}%`,
                                            }}
                                        >
                                            {src.leads_count ?? "-"}
                                        </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                {!data?.length || !isNotEmpty ?
                    <div className="absolute left-3 right-3 bottom-2 top-14 m-auto backdrop-blur-sm rounded-md border flex items-center justify-center">
                        {!isFetching && (
                            <p className="text-orange-400">
                                Ma'lumot yetarli emas
                            </p>
                        )}
                    </div>
                :   ""}
            </Card>
            <Card className="hover:shadow-lg border-none">
                <CardContent>
                    <LeadsMonthlyStats />
                </CardContent>
            </Card>
        </div>
    )
}
