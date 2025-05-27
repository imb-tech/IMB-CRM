import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react"
import FinanceCard from "./finance-card"
import { FinanceChart } from "./finance-chart/finance-chart"
import FinancePieChart from "./finance-chart/index"
import { BarChartLabel } from "./finance-chart/bar-chart-label"
import FinanceStatus from "./finance-status"

export const cardData = [
    {
        title: "Jami Daromad",
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
        title: "Jami Xarajatlar",
        value: "3 000",
        change: "-4.2%",
        icon: <TrendingDown className="h-4 w-4" />,
        bgColor: "bg-orange-100/70 dark:bg-orange-900/30",
        iconLarge: <TrendingDown className="h-24 w-24 text-orange-300" />,
        badgeBg: "bg-orange-200 dark:bg-orange-900/40",
        textColor: "text-orange-600 dark:text-orange-400",
        url: "/finance/cost",
    },
    {
        title: "Sof Foyda",
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
        title: "Hisob Balansi",
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

const FinanceMain = () => {
    return (
        <div className="w-full space-y-4">
            <Card className="w-full">
                <CardContent>
                    <h3 className="text-lg font-semibold mb-4">
                        Moliyaviy Ko'rsatkichlar
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {cardData.map((card, idx) => (
                            <FinanceCard key={idx} data={card} />
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2 ">
                <CardContent>
                    <h3 className="text-lg font-semibold mb-4">
                        Daromad va Xarajatlar
                    </h3>
                    <FinanceChart data={undefined} />
                </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-3">
                    <FinanceStatus />
                </div>

                <FinancePieChart />
                <Card className="lg:col-span-3">
                    <CardContent>
                        <h3 className="text-lg mb-4 font-semibold">
                            Bo'limlar Daromadi
                        </h3>
                        <BarChartLabel />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default FinanceMain
