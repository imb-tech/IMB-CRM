import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    GraduationCap,
    Users,
    Clock,
    MapPin,
    User,
    Building,
    Calendar,
    Edit,
    Trash2,
    MessageSquare,
    UserPlus,
    Eye,
    MoreHorizontal,
    Banknote,
    ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useCallback, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

function MiniStatCard({ label, value, icon: Icon, color }: any) {
    const colors = colorClasses[color as string]

    return (
        <div
            className={cn(
                "flex flex-col gap-1 px-4 py-2 rounded-lg",
                colors.bg,
            )}
        >
            <div className={cn("text-xs", colors.text)}>{label}</div>
            <div className="flex items-center gap-3">
                <Icon className={cn("w-4 h-4", colors.text)} />
                <div className={cn("text-sm font-bold", colors.value)}>
                    {value}
                </div>
            </div>
        </div>
    )
}

export default function GroupProfile() {
    const cards = [
        {
            label: "O'quvchi soni",
            value: 15,
            icon: Users,
            color: "blue",
        },
        {
            label: "Vaqt",
            value: "10:00 - 12:30",
            icon: Clock,
            color: "orange",
        },
        {
            label: "Xona",
            value: "3-xona",
            icon: MapPin,
            color: "purple",
        },
        {
            label: "O'qituvchi",
            value: "Shahboz Nabiyev",
            icon: User,
            color: "emerald",
        },
    ]

    const isMobile = useIsMobile()
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = useCallback(
        (st: boolean) => {
            if (isMobile) {
                setOpen(st)
            }
        },
        [isMobile],
    )

    return (
        <div
            className={cn(
                "fixed md:static w-full bottom-0 left-0 right-0",
                open ? "top-0 flex items-end" : "",
                isMobile ? "p-2" : "",
            )}
        >
            {isMobile && (
                <span
                    onClick={() => handleOpen(false)}
                    className={cn(
                        "transition-all duration-200",
                        open ?
                            "fixed top-[60px] bottom-0 left-0 right-0 backdrop-blur-[5px]"
                        :   "",
                    )}
                ></span>
            )}
            <Card className="bg-card border-0 shadow-sm rounded-md overflow-hidden w-full relative">
                <CardHeader
                    className="bg-gradient-to-br from-indigo-500/40 to-purple-600/40 text-indigo-500 dark:text-white p-4"
                    onClick={() => handleOpen(!open)}
                >
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">
                                    Online FrontEnd
                                </h3>
                                <p className="text-xs text-indigo-500 dark:text-white">
                                    Dasturlash
                                </p>
                            </div>
                        </div>
                        <Badge className="bg-white/20 text-indigo-500 dark:text-white border-0 text-xs">
                            Faol
                        </Badge>
                        {isMobile && (
                            <span className={open ? "rotate-180" : ""}>
                                <ChevronUp size={32} />
                            </span>
                        )}
                    </div>
                </CardHeader>

                <CardContent
                    className={cn(
                        "p-4 space-y-4",
                        !isMobile ? ""
                        : open ? "h-[420px] transition-all duration-300"
                        : "h-[0px] py-0 transition-all duration-300 overflow-hidden",
                    )}
                >
                    <div className="flex items-center gap-2 bg-primary/10 p-3 rounded-md">
                        <Banknote className="text-primary" size={16} />
                        <span className="text-primary font-medium">
                            300 000 so'm
                        </span>
                    </div>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-3">
                        {cards.map((card, idx) => (
                            <MiniStatCard key={idx} {...card} />
                        ))}
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3 py-2 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600 text-xs">
                                Du, Se, Ch, Pa, Ju, Sh
                            </span>
                        </div>
                        <div className="text-xs text-gray-500">
                            16.06.2025 - 16.06.2026
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-1 pt-3 border-t">
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 p-1 text-blue-600 hover:bg-blue-50"
                        >
                            <Edit size={15} />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 p-1 text-red-600 hover:bg-red-50"
                        >
                            <Trash2 size={15} />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 p-1 text-yellow-600 hover:bg-yellow-50"
                        >
                            <MessageSquare size={15} />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 p-1 text-green-600 hover:bg-green-50"
                        >
                            <UserPlus size={15} />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 p-1 text-purple-600 hover:bg-purple-50"
                        >
                            <Eye size={15} />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 p-1 text-gray-600 hover:bg-gray-50"
                        >
                            <MoreHorizontal size={15} />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const colorClasses: Record<string, Record<string, string>> = {
    blue: {
        bg: "bg-blue-500/10",
        text: "text-blue-600",
        value: "text-blue-700",
    },
    orange: {
        bg: "bg-orange-500/10",
        text: "text-orange-600",
        value: "text-orange-700",
    },
    purple: {
        bg: "bg-purple-500/10",
        text: "text-purple-600",
        value: "text-purple-700",
    },
    emerald: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-600",
        value: "text-emerald-700",
    },
}
