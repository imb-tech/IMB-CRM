import { useSearch } from "@tanstack/react-router"
import ReportCard from "./report-card"
import { useGet } from "@/hooks/useGet"
import { formatMoney } from "@/lib/format-money"
import { REPORTS_STATIS_PAYMENTS } from "@/constants/api-endpoints"

export default function StudentPaymentsNumber() {
    const search = useSearch({ from: "/_main/reports/" })
    const { page, page_size, tabs, ...res } = search

    const { data } = useGet<{ debts: number; payment: number; plan: number }>(
        REPORTS_STATIS_PAYMENTS,
        {
            params: res,
        },
    )

    const cardData = [
        {
            title: "Umumiy summa",
            value: formatMoney(data?.plan),
            badgeBg: "bg-blue-200 dark:bg-blue-900/40",
            textColor: "text-blue-600 dark:text-blue-400",
            url: "/finance/income",
        },
        {
            title: "To'langan",
            value: formatMoney(data?.payment),
            badgeBg: "bg-green-200 dark:bg-green-900/40",
            textColor: "text-green-600 dark:text-green-400",
            url: "/finance/cost",
        },
        {
            title: "Qarzdorlik",
            value: formatMoney(data?.debts),
            badgeBg: "bg-rose-200 dark:bg-rose-900/40",
            textColor: "text-rose-600 dark:text-rose-400",
            url: "/finance/income",
        },
        {
            title: "Kutilayotgan",
            value: formatMoney(0),
            badgeBg: "bg-orange-200 dark:bg-orange-900/40",
            textColor: "text-orange-700 dark:text-orange-400",
            url: "/finance/income",
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cardData.map((card, idx) => (
                <ReportCard key={idx} data={card} />
            ))}
        </div>
    )
}
