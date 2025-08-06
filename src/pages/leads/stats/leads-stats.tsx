import {
    TrendingUp,
    TrendingDown,
    Percent,
    UserPlus,
    Clock8,
} from "lucide-react"

import { DashboardHeader } from "./lead-stats-header"

import { MetricCard } from "./metric-card"
import StatsBySources from "./stats-by-sources"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"
import StatsByEmployee from "./stats-by-employee"

export default function LeadsDashboard() {
    const { start_date, end_date, pipeline } = useSearch({ from: "__root__" })

    const { data, isFetching } = useGet<MainLeadStats>(
        "leads/common/main-statistic",
        {
            params: { start_date, end_date, pipeline },
        },
    )

    return (
        <div>
            <DashboardHeader />

            <main>
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                    <MetricCard
                        title="Yangi qo'shilgan"
                        value={data?.main_card.total?.toLocaleString()!}
                        icon={<UserPlus size={20} className="text-blue-500" />}
                    />

                    <MetricCard
                        title="Jarayonda"
                        value={data?.main_card.processing?.toLocaleString()!}
                        icon={<Clock8 size={20} className="text-orange-500" />}
                    />

                    <MetricCard
                        title="O'chirilgan"
                        value={data?.main_card.loosed_count?.toLocaleString()!}
                        icon={
                            <TrendingDown size={20} className="text-rose-500" />
                        }
                    />

                    <MetricCard
                        title="Muvaffaqiyatli"
                        value={data?.main_card.success_count?.toLocaleString()!}
                        icon={
                            <TrendingUp size={20} className="text-green-500" />
                        }
                    />

                    <MetricCard
                        title="Samaradorlik"
                        value={`${Math.floor(data?.main_card.success_percentage ?? 0)}%`}
                        icon={
                            <Percent size={20} className="text-emerald-500" />
                        }
                    />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <StatsBySources
                        data={data?.source}
                        isFetching={isFetching}
                    />

                    <StatsByEmployee />
                </section>
            </main>
        </div>
    )
}
