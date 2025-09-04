import { Card, CardContent } from "@/components/ui/card"
import { useGet } from "@/hooks/useGet"
import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
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
    LucideIcon,
} from "lucide-react"

const statsData: {
    icon: LucideIcon,
    label: string,
    key: keyof DashboardStatTypes
    bgColor: string,
    iconColor: string,
}[] = [
        {
            icon: GraduationCap,
            label: "Talabalar",
            key: "students",
            bgColor: "bg-green-50 dark:bg-green-900/10",
            iconColor: "text-green-600 dark:text-green-400",
        },
        {
            icon: BookOpen,
            label: "Sinovda",
            key: "new_students",
            bgColor: "bg-amber-50 dark:bg-amber-900/10",
            iconColor: "text-amber-600 dark:text-amber-400",
        },
        {
            icon: GraduationCap,
            label: "Muzlatilgan",
            key: "frozen_students",
            bgColor: "bg-gray-50 dark:bg-secondary/20",
            iconColor: "text-gray-600 dark:text-gray-400",
        },
        {
            icon: UserCheck,
            label: "Tark etganlar",
            key: "deleted_students",
            bgColor: "bg-rose-50 dark:bg-rose-900/10",
            iconColor: "text-rose-600 dark:text-rose-400",
        },
        {
            icon: Clock,
            label: "Qarzdorlar",
            key: "debtors",
            bgColor: "bg-red-50 dark:bg-red-900/10",
            iconColor: "text-red-600 dark:text-red-400",
        },
        {
            icon: DollarSign,
            label: "Summasi",
            key: "debtors_amount",
            bgColor: "bg-rose-50 dark:bg-rose-900/10",
            iconColor: "text-rose-600 dark:text-rose-400",
        },
        {
            icon: CreditCard,
            label: "To'lovi yaqinlar",
            key: "students_due_soon_count",
            bgColor: "bg-orange-50 dark:bg-orange-900/10",
            iconColor: "text-orange-600 dark:text-orange-400",
        },
        {
            icon: Layers,
            label: "Guruhlar",
            key: "groups",
            bgColor: "bg-teal-50 dark:bg-teal-900/10",
            iconColor: "text-teal-600 dark:text-teal-400",
        },
        {
            icon: BookOpenCheck,
            label: "O'qituvchilar",
            key: "teachers",
            bgColor: "bg-indigo-50 dark:bg-indigo-900/10",
            iconColor: "text-indigo-600 dark:text-indigo-400",
        },
    ]

type DashboardStatTypes = {
    leads: number,
    new_students: number,
    deleted_students: number,
    frozen_students: number,
    students: number,
    debtors: number,
    debtors_amount: number,
    students_due_soon_count: number,
    groups: number,
    teachers: number
}

export default function DashboardCard() {

    const { data } = useGet<DashboardStatTypes>('platform/statistics/dashboard')

    return (
        <Card className="w-full ">
            <CardContent>
                <h3 className="text-lg font-semibold mb-4">
                    Umumiy Ko'rsatkichlar
                </h3>
                <div className="grid xl:grid-cols-9 gap-y-3 lg:grid-cols-4  sm:grid-cols-3  grid-cols-2">
                    {statsData.map(
                        (
                            { icon: Icon, label, bgColor, iconColor, key },
                            index,
                        ) => (
                            <Link
                                to="/students"
                                search={{ id: label }}
                                key={index}
                                className={cn(
                                    "px-2  transition-all cursor-pointer ",
                                    index === 3 || index == 6
                                        ? "xl:border-r"
                                        : "",
                                )}
                            >
                                <div
                                    key={index}
                                    className={`flex flex-col hover:scale-105 items-center justify-center p-3 rounded-lg ${bgColor}`}
                                >
                                    <Icon
                                        className={`h-6 w-6 mb-1 ${iconColor}`}
                                    />
                                    <p className="text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                        {label}
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {formatMoney(data?.[key])}
                                    </p>
                                </div>
                            </Link>
                        ),
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
