import { DashboardHeader } from "./lead-stats-header"
import StatsBySources from "./stats-by-sources"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"
import StatsByEmployee from "./stats-by-employee"
import LeadsMonthlyStats from "./leads-monthly-stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { StageColumn } from "./metric-card"
import { formatMoney } from "@/lib/format-money"

export default function LeadsDashboard() {
    const { start_date, end_date, pipeline } = useSearch({ from: "__root__" })

    const { data, isFetching } = useGet<MainLeadStats>(
        "leads/common/main-statistic",
        {
            params: { start_date, end_date, pipeline },
        },
    )

    const { data: dataStatus } = useGet<MainLeadStatus>(
        `leads/common/sale-statistic/${pipeline}`,
        {
            params: { start_date, end_date },
        },
    )

    return (
        <div>
            <DashboardHeader />

            <main>
                <div className="w-full flex justify-between border rounded-lg p-2 items-stretch md:gap-8 gap-3 mb-4">
                    <Card className="hover:shadow-md border-none relative md:min-w-36 md:w-max w-[80%]">
                        <CardHeader className="flex flex-row items-center justify-center border-b space-y-0 pb-2">
                            <CardTitle className="text-xl font-medium uppercase ">
                                {("lidlar")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center gap-1 items-center mt-6">
                            <Users className="text-blue-500 size-8 mr-1" />
                            <CardTitle className="text-4xl font-medium ">
                                {formatMoney(dataStatus?.main?.total_count)}
                            </CardTitle>
                        </CardContent>
                    </Card>

                    <div className="overflow-x-auto sm:flex hidden   bg-card rounded-lg p-2  gap-2 no-scrollbar-x">
                        {dataStatus?.statuses?.map((stage) => (
                            <StageColumn key={stage.id} stage={stage} />
                        ))}
                    </div>

                    <Card className="hover:shadow-md border-none flex flex-col justify-between relative md:min-w-56  md:w-max w-full">
                        <CardContent className="flex flex-col justify-end ">
                            <div className="space-y-3">
                                {/* Erishilgan (Achieved) Card */}
                                <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-2.5">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-green-400 font-medium">
                                                {("Erishilgan")}
                                            </h3>
                                            <p className="text-green-400  font-medium">
                                                {formatMoney(
                                                    dataStatus?.main
                                                        ?.success_amount,
                                                )}{" "}
                                                {("so'm")}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-green-400 font-medium">
                                                {formatMoney(
                                                    dataStatus?.main
                                                        ?.total_success,
                                                )}
                                            </p>
                                            <p className="text-green-400 text-xs">
                                                {(
                                                    (Number(
                                                        dataStatus?.main
                                                            ?.total_success,
                                                    ) /
                                                        Number(
                                                            dataStatus?.main
                                                                ?.total_count,
                                                        )) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Yo'qotilgan (Lost) Card */}
                                <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-2.5">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-red-400  font-medium">
                                                {("Yo'qotilgan")}
                                            </h3>
                                            <p className="text-red-400  font-medium">
                                                {formatMoney(
                                                    dataStatus?.main
                                                        ?.loosed_amount,
                                                )}{" "}
                                                {("so'm")}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-red-400  font-medium">
                                                {formatMoney(
                                                    dataStatus?.main
                                                        ?.total_loosed,
                                                )}
                                            </p>
                                            <p className="text-red-400 text-xs">
                                                {(
                                                    (Number(
                                                        dataStatus?.main
                                                            ?.total_loosed,
                                                    ) /
                                                        Number(
                                                            dataStatus?.main
                                                                ?.total_count,
                                                        )) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="overflow-x-auto flex sm:hidden   bg-card rounded-lg p-2  gap-2 no-scrollbar-x">
                    {dataStatus?.statuses?.map((stage) => (
                        <StageColumn key={stage.id} stage={stage} />
                    ))}
                </div>

                <section className="grid mt-4 grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    <StatsBySources
                        data={data?.source}
                        isFetching={isFetching}
                    />

                    <StatsByEmployee />
                </section>

                <LeadsMonthlyStats />
            </main>
        </div>
    )
}

export interface Opportunity {
    id: string
    name: string
    description: string
    contactDate: string
    value: number
}

export interface Stage {
    id: string
    name: string
    count: number
    totalValue: number
    opportunities: Opportunity[]
    color: string
}

export const pipelineStages: Stage[] = [
    {
        id: "loads",
        name: "Loads",
        count: 4,
        totalValue: 15137,
        color: "bg-blue-700",
        opportunities: [
            {
                id: "opp-a",
                name: "Opportunity A",
                description: "Text Here",
                contactDate: "5/4/2021",
                value: 350,
            },
            {
                id: "opp-b",
                name: "Opportunity B",
                description: "Text Here",
                contactDate: "5/4/2021",
                value: 787,
            },
            {
                id: "opp-c",
                name: "Opportunity C",
                description: "Text Here",
                contactDate: "4/13/2021",
                value: 5000,
            },
        ],
    },
    {
        id: "suspects",
        name: "Suspects",
        count: 2,
        totalValue: 15000,
        color: "bg-blue-500",
        opportunities: [
            {
                id: "opp-e",
                name: "Opportunity E",
                description: "Text Here",
                contactDate: "5/4/2021",
                value: 5000,
            },
            {
                id: "opp-f",
                name: "Opportunity F",
                description: "Text Here",
                contactDate: "6/26/2021",
                value: 10000,
            },
        ],
    },
    {
        id: "qualification",
        name: "Qualification",
        count: 4,
        totalValue: 28400,
        color: "bg-orange-500",
        opportunities: [
            {
                id: "opp-g",
                name: "Opportunity G",
                description: "Text Here",
                contactDate: "11/21/2021",
                value: 4900,
            },
            {
                id: "opp-h",
                name: "Opportunity H",
                description: "Text Here",
                contactDate: "11/21/2021",
                value: 2500,
            },
            {
                id: "opp-i",
                name: "Opportunity I",
                description: "Text Here",
                contactDate: "11/21/2021",
                value: 15000,
            },
        ],
    },
    {
        id: "meeting",
        name: "Meeting",
        count: 4,
        totalValue: 15700,
        color: "bg-slate-700",
        opportunities: [
            {
                id: "opp-k",
                name: "Opportunity K",
                description: "Text Here",
                contactDate: "5/4/2021",
                value: 7000,
            },
            {
                id: "opp-l",
                name: "Opportunity L",
                description: "Text Here",
                contactDate: "11/21/2021",
                value: 1500,
            },
            {
                id: "opp-m",
                name: "Opportunity M",
                description: "Text Here",
                contactDate: "11/21/2021",
                value: 4200,
            },
        ],
    },
    {
        id: "quote",
        name: "Quote",
        count: 3,
        totalValue: 39500,
        color: "bg-blue-600",
        opportunities: [
            {
                id: "opp-o",
                name: "Opportunity O",
                description: "Text Here",
                contactDate: "5/4/2021",
                value: 27000,
            },
            {
                id: "opp-p",
                name: "Opportunity P",
                description: "Text Here",
                contactDate: "5/4/2021",
                value: 10000,
            },
            {
                id: "opp-q",
                name: "Opportunity Q",
                description: "Text Here",
                contactDate: "5/4/2021",
                value: 2500,
            },
        ],
    },
]
