import { Card, CardContent } from "@/components/ui/card"
import {
    Users,
    BookOpen,
    UserCheck,
    UserPlus,
    AlertCircle,
    Calendar,
    DollarSign,
    Layers,
    GraduationCap,
} from "lucide-react"

const data = [
    {
        items: [
            {
                label: "Lidlar",
                value: 400,
                icon: UserPlus,
                textColor: "text-blue-600",
            },
            {
                label: "Sinov darsida o'qiyotganlar",
                value: 600,
                icon: BookOpen,
                textColor: "text-green-600",
            },
            {
                label: "Sinovga kelib ketganlar",
                value: 600,
                icon: Users,
                textColor: "text-purple-600",
            },
            {
                label: "Faol talabalar",
                value: 200,
                icon: UserCheck,
                textColor: "text-amber-600",
            },
        ],
    },
    {
        items: [
            {
                label: "Qarzdorlar soni",
                value: 30,
                icon: AlertCircle,
                textColor: "text-red-600",
            },
            {
                label: "To'lov yaqin qolganlar",
                value: 20,
                icon: Calendar,
                textColor: "text-orange-600",
            },
            {
                label: "Summasi",
                value: 600,
                icon: DollarSign,
                textColor: "text-emerald-600",
            },
        ],
    },
    {
        items: [
            {
                label: "Guruhlar",
                value: 10,
                icon: Layers,
                textColor: "text-cyan-600",
            },
            {
                label: "O'qituvchilar",
                value: 50,
                icon: GraduationCap,
                textColor: "text-violet-600",
            },
        ],
    },
]

export function DashboardCard() {
    return (
        <div className="space-y-2 w-full">
            <Card className="grid  gap-3 lg:grid-cols-3 grid-cols-1 rounded-xl">
                {data.map((parent, index) => (
                    <CardContent
                        key={index}
                        className="space-y-3 border rounded-xl"
                    >
                        {parent.items.map((item, i) => (
                            <div
                                key={i}
                                className={
                                    "flex items-center justify-between gap-3 border-b pb-2 "
                                }
                            >
                                <div className="flex items-center gap-2">
                                    <item.icon
                                        size={18}
                                        className={item.textColor}
                                    />{" "}
                                    <span>{item.label}:</span>
                                </div>
                                <span>{item.value}</span>
                            </div>
                        ))}
                    </CardContent>
                ))}
            </Card>
        </div>
    )
}
