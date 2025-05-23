import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
    Users,
    BookOpen,
    UserCheck,
    GraduationCap,
    Clock,
    CreditCard,
    DollarSign,
    Layers,
    BookOpenCheck,
} from "lucide-react"

const statsData = [
    {
        icon: Users,
        label: "Lidlar",
        value: 400,
        bgColor: "bg-purple-50 dark:bg-purple-900/10",
        iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
        icon: BookOpen,
        label: "Sinovda",
        value: 600,
        bgColor: "bg-amber-50 dark:bg-amber-900/10",
        iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
        icon: UserCheck,
        label: "Tark etganlar",
        value: 600,
        bgColor: "bg-rose-50 dark:bg-rose-900/10",
        iconColor: "text-rose-600 dark:text-rose-400",
    },
    {
        icon: GraduationCap,
        label: "Talabalar",
        value: 200,

        bgColor: "bg-green-50 dark:bg-green-900/10",
        iconColor: "text-green-600 dark:text-green-400",
    },
    {
        icon: Clock,
        label: "Qarzdorlar",
        value: 30,
        bgColor: "bg-red-50 dark:bg-red-900/10",
        iconColor: "text-red-600 dark:text-red-400",
    },
    {
        icon: DollarSign,
        label: "Summasi",
        value: 600,
        bgColor: "bg-rose-50 dark:bg-rose-900/10",
        iconColor: "text-rose-600 dark:text-rose-400",
    },
    {
        icon: CreditCard,
        label: "To'lovi yaqinlar",
        value: 20,
        bgColor: "bg-orange-50 dark:bg-orange-900/10",
        iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
        icon: Layers,
        label: "Guruhlar",
        value: 10,
        bgColor: "bg-teal-50 dark:bg-teal-900/10",
        iconColor: "text-teal-600 dark:text-teal-400",
    },
    {
        icon: BookOpenCheck,
        label: "O'qituvchilar",
        value: 50,
        bgColor: "bg-indigo-50 dark:bg-indigo-900/10",
        iconColor: "text-indigo-600 dark:text-indigo-400",
    },
]

export default function DashboardCard() {
    return (
        <Card className="w-full ">
            <CardContent>
                <h3 className="text-lg font-semibold mb-4">
                    Umumiy Ko'rsatkichlar
                </h3>
                <div className="grid xl:grid-cols-9 lg:grid-cols-4  sm:grid-cols-3  grid-cols-2">
                    {statsData.map(
                        (
                            { icon: Icon, label, value, bgColor, iconColor },
                            index,
                        ) => (
                            <div
                                className={cn(
                                    "px-2 ",
                                    index === 3 || index == 6 ? "border-r" : "",
                                )}
                            >
                                <div
                                    key={index}
                                    className={`flex flex-col items-center justify-center p-3 rounded-lg ${bgColor}`}
                                >
                                    <Icon
                                        className={`h-6 w-6 mb-1 ${iconColor}`}
                                    />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {label}
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {value}
                                    </p>
                                </div>
                            </div>
                        ),
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
