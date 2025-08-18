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
        title: "Umumiy summa",
        value: "10 000",
        badgeBg: "bg-blue-200 dark:bg-blue-900/40",
        textColor: "text-blue-600 dark:text-blue-400",
        url: "/finance/income",
    },
    {
        title: "To'langan",
        value: "3 000",
        badgeBg: "bg-green-200 dark:bg-green-900/40",
        textColor: "text-green-600 dark:text-green-400",
        url: "/finance/cost",
    },
    {
        title: "Qarzdorlik",
        value: "7 000",
        badgeBg: "bg-rose-200 dark:bg-rose-900/40",
        textColor: "text-rose-600 dark:text-rose-400",
        url: "/finance/income",
    },
    {
        title: "Kutilayotgan",
        value: "15 000",
        badgeBg: "bg-orange-200 dark:bg-orange-900/40",
        textColor: "text-orange-700 dark:text-orange-400",
        url: "/finance/income",
    },
]
