import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"
import { useMemo } from "react"

export default function StatsByEmployee() {
    const { start_date, end_date, pipeline } = useSearch({ from: "__root__" })
    const { data, isFetching } = useGet<MainLeadStats>(
        "leads/common/main-statistic",
        {
            params: { start_date, end_date, pipeline },
        },
    )

    const fakeD = useMemo<MainLeadStats["employees"]>(() => {
        if (data?.employees?.length) {
            return data.employees.sort((a, b) => b.count - a.count)
        } else {
            return Array(7)
                .fill(0)
                ?.map(() => ({
                    worker: 1,
                    full_name: "string",
                    count: 10,
                }))
        }
    }, [data])

    console.log(fakeD)

    return (
        <Card className="hover:shadow-lg border-none relative">
            <CardHeader>
                <CardTitle className="font-extralight">
                    Eng yaxshi xodimlar
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
                <div className="space-y-2" key={fakeD.length}>
                    {fakeD.map((user, index) => (
                        <div
                            key={user.full_name}
                            className="flex items-center justify-between p-3 rounded-lg bg-secondary cursor-pointer transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                        index === 0 ?
                                            "bg-yellow-100 text-yellow-800"
                                        : index === 1 ?
                                            "bg-gray-100 text-gray-800"
                                        : index === 2 ?
                                            "bg-orange-100 text-orange-800"
                                        :   "bg-blue-100 text-blue-800"
                                    }`}
                                >
                                    {index + 1}
                                </div>
                                <p className="font-medium">{user.full_name}</p>
                            </div>
                            <Badge

                                className="font-semibold"
                            >
                                {user.count} Lidlar
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>

            {data?.employees?.length ?
                ""
            :   <div className="absolute left-1 right-1 bottom-2 top-14 m-auto backdrop-blur-sm rounded-md border flex pt-20 justify-center">
                    {!isFetching && (
                        <p className="text-orange-400">Ma'lumot yetarli emas</p>
                    )}
                </div>
            }
        </Card>
    )
}
