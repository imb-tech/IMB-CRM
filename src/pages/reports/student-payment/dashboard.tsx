import { CheckCheck } from "lucide-react"
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react"
import ReportCard from "./report-card"

export default function StudentPaymentsNumber() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cardData.map((card, idx) => (
                <ReportCard key={idx} data={card} />
            ))}
        </div>
    )
}

export const cardData = [
    {
        title: "To'lovchi",
        value: "10 000",
        change: "+12.5%",
        icon: <TrendingUp className="h-4 w-4 " />,
        bgColor: "bg-green-100/70 dark:bg-green-900/30",
        iconLarge: <TrendingUp className="h-24 w-24 text-green-300" />,
        badgeBg: "bg-green-200 dark:bg-green-900/40",
        textColor: "text-green-600 dark:text-green-400",
        url: "/finance/income",
    },
    {
        title: "To'langan",
        value: "3 000",
        change: "-4.2%",
        icon: <TrendingDown className="h-4 w-4" />,
        bgColor: "bg-orange-100/70 dark:bg-orange-900/30",
        iconLarge: <CheckCheck className="h-24 w-24 text-orange-300" />,
        badgeBg: "bg-orange-200 dark:bg-orange-900/40",
        textColor: "text-orange-600 dark:text-orange-400",
        url: "/finance/cost",
    },
    {
        title: "To'lanmagan",
        value: "7 000",
        change: "+8.1%",
        icon: <DollarSign className="h-4 w-4 " />,
        bgColor: "bg-purple-100/70 dark:bg-purple-900/30",
        iconLarge: <DollarSign className="h-24 w-24 text-purple-300" />,
        badgeBg: "bg-purple-200 dark:bg-purple-900/40",
        textColor: "text-purple-600 dark:text-purple-400",
        url: "/finance/income",
    },
    {
        title: "Kutilayotgan",
        value: "15 000",
        change: "+2.3%",
        icon: <CreditCard className="h-4 w-4 " />,
        bgColor: "bg-blue-100/70 dark:bg-blue-900/30",
        iconLarge: <CreditCard className="h-24 w-24 text-blue-300" />,
        badgeBg: "bg-blue-200 dark:bg-blue-900/40",
        textColor: "text-blue-700 dark:text-blue-400",
        url: "/finance/income",
    },
]
