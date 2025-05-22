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

const dashboardData = [
    {
        title: "O'quvchilar statistikasi",
        color: "blue",
        items: [
            {
                label: "Lidlar",
                value: 400,
                icon: UserPlus,
                gradient: "from-blue-600 to-blue-400",
                textColor: "text-blue-100",
            },
            {
                label: "Sinov darsida o'qiyotganlar",
                value: 100,
                icon: BookOpen,
                gradient: "from-green-600 to-green-400",
                textColor: "text-green-100",
            },
            {
                label: "Sinovga kelib ketganlar",
                value: 100,
                icon: Users,
                gradient: "from-purple-600 to-purple-400",
                textColor: "text-purple-100",
            },
            {
                label: "Faol talabalar",
                value: 200,
                icon: UserCheck,
                gradient: "from-amber-600 to-amber-400",
                textColor: "text-amber-100",
            },
        ],
        cols: "md:grid-cols-2 lg:grid-cols-4",
    },
    {
        title: "To'lovlar statistikasi",
        color: "red",
        items: [
            {
                label: "Qarzdorlar soni",
                value: 30,
                icon: AlertCircle,
                gradient: "from-red-600 to-red-400",
                textColor: "text-red-100",
            },
            {
                label: "To'lov yaqin qolganlar",
                value: 20,
                icon: Calendar,
                gradient: "from-orange-600 to-orange-400",
                textColor: "text-orange-100",
            },
            {
                label: "Summasi",
                value: 100,
                icon: DollarSign,
                gradient: "from-emerald-600 to-emerald-400",
                textColor: "text-emerald-100",
            },
        ],
        cols: "md:grid-cols-3",
    },
    {
        title: "Umumiy statistika",
        color: "cyan",
        items: [
            {
                label: "Guruhlar",
                value: 10,
                icon: Layers,
                gradient: "from-cyan-600 to-cyan-400",
                textColor: "text-cyan-100",
            },
            {
                label: "O'qituvchilar",
                value: 50,
                icon: GraduationCap,
                gradient: "from-violet-600 to-violet-400",
                textColor: "text-violet-100",
            },
        ],
        cols: "md:grid-cols-2",
    },
]

export function DashboardCard() {
    return (
        <div className="space-y-2 w-full">
            {dashboardData.map((section, idx) => (
                <div key={idx}>
                    <div className={`grid grid-cols-1 ${section.cols} gap-2`}>
                        {section.items.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <div
                                    key={i}
                                    className={`relative bg-gradient-to-r ${item.gradient} text-white rounded-xl p-6 overflow-hidden shadow-lg`}
                                >
                                    <div className="absolute top-0 right-0 mt-4 mr-4 bg-white/20 rounded-full p-2">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="absolute -bottom-6 -right-6 opacity-10">
                                        <Icon className="h-24 w-24" />
                                    </div>
                                    <p
                                        className={`text-sm font-medium ${item.textColor} mb-1`}
                                    >
                                        {item.label}
                                    </p>
                                    <p className="text-4xl font-bold">
                                        {item.value}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}
