import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Users,
    Calendar,
    Edit,
    Trash2,
    MessageSquare,
    UserPlus,
    Eye,
    Banknote,
    ChevronUp,
    ArrowLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useCallback, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useParams } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import { GROUP } from "@/constants/api-endpoints"
import { daysMap, shiftGroupped } from "@/lib/shift-groupped"
import { formatMoney } from "@/lib/format-money"
import Modal from "@/components/custom/modal"
import GroupCreate from "../groups/create"
import { useModal } from "@/hooks/useModal"
import useHistoryNavigate from "@/hooks/use-history-navigate"
import ActionDropdown from "@/components/elements/action-dropdown"

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
    const { id } = useParams({ from: "/_main/groups/$id" })
    const { data } = useGet<Group>(GROUP + "/" + id)
    const { openModal } = useModal(`${GROUP}-add`)
    const { back } = useHistoryNavigate()

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
                "fixed md:static w-full bottom-0 left-0 right-0 z-10",
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
                            : "",
                    )}
                ></span>
            )}
            <Card className="bg-card border-0 shadow-sm rounded-md overflow-hidden w-full relative">
                <CardHeader
                    className="bg-gradient-to-br from-primary/30 to-primary/20 text-black dark:text-white p-4 md:px-3 md:py-1"
                    onClick={() => handleOpen(!open)}
                >
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-8 h-8 bg-background/70 rounded-lg flex items-center justify-center hover:bg-background cursor-pointer"
                                onClick={() => back({ from: `/groups/${id}`, fallBack: '/groups' })}
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-lg">{data?.name}</h3>
                            </div>
                        </div>
                        <div className="ml-auto hidden md:block">
                            <div className="hidden md:flex items-center gap-3 py-2 text-sm">
                                <div className="bg-card/40 rounded-sm px-3 py-1">
                                    <span className="text-xs">O'qituvchi</span>
                                    <div className="text-sm flex items-center gap-2 mt-0.5">
                                        <p>{data?.teacher_name}</p>
                                    </div>
                                </div>
                                <div className="bg-card/40 rounded-sm px-3 py-1">
                                    <span className="text-xs">Dars vaqti</span>
                                    <div className="text-sm flex items-center mt-0.5">
                                        {(data?.shifts_data ?? [])?.map(
                                            (sh, i) => (
                                                <div
                                                    key={sh.day_of_week}
                                                    className="flex"
                                                >
                                                    {/* {i > 0 ? "|" : ""} */}
                                                    <p>
                                                        {i == 0 ? "" : ", "}
                                                        {
                                                            daysMap[
                                                            sh.day_of_week
                                                            ]
                                                        }
                                                    </p>
                                                    {/* <p>{sh.start_time}</p>
                                                    <p>{sh.end_time}</p> */}
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                                <div className="bg-card/40 rounded-sm px-3 py-1">
                                    <span className="text-xs">Kurs nomi</span>
                                    <div className="text-sm flex items-center gap-2 mt-0.5">
                                        <p>{data?.course_name}</p>
                                    </div>
                                </div>
                                <div className="bg-card/40 rounded-sm px-3 py-1">
                                    <span className="text-xs">Kurs narxi</span>
                                    <div className="flex items-center gap-2 mt-0.5 ">
                                        {/* <Banknote className="w-3 h-3" /> */}
                                        <p className="text-sm">
                                            {formatMoney(data?.price)}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-card/40 rounded-sm px-3 py-1">
                                    <span className="text-xs">Davomiyligi</span>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        {/* <Calendar className="w-3 h-3" /> */}
                                        <div className="text-sm">
                                            {data?.start_date} /{" "}
                                            {data?.end_date}
                                        </div>
                                    </div>
                                </div>
                                <ActionDropdown
                                    options={[
                                        { key: "edit", onClick: openModal },
                                        { key: "delete", onClick: openModal },
                                    ]}
                                />
                            </div>
                        </div>

                        {isMobile && (
                            <span className={open ? "rotate-180" : ""}>
                                <ChevronUp size={32} />
                            </span>
                        )}
                    </div>
                </CardHeader>

                <CardContent
                    className={cn(
                        "p-4 space-y-4 transition-all duration-300",
                        open && isMobile ? "h-[420px]" : (
                            "h-[0px] py-0 overflow-hidden"
                        ),
                    )}
                >
                    <div className="flex items-center gap-2 bg-primary/10 p-3 rounded-md">
                        <Banknote className="text-primary" size={16} />
                        <span className="text-primary font-medium">
                            {formatMoney(data?.price)} so'm
                        </span>
                    </div>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-3">
                        <MiniStatCard label="Faol o'quvchilar soni" color="blue" value={data?.students_count.active} icon={Users} />
                        <MiniStatCard label="Xona" color="blue" value={data?.room_name} icon={Users} />
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3 py-2 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600 text-xs">
                                {shiftGroupped(data?.shifts_data ?? [])?.map(
                                    (sh) => (
                                        <div
                                            key={sh.days}
                                            className="flex gap-2"
                                        >
                                            <p className="flex-1">{sh.days}</p>
                                            <p>{sh.start_time}</p>
                                            <p>{sh.end_time}</p>
                                        </div>
                                    ),
                                )}
                            </span>
                        </div>
                        <div className="text-xs text-gray-500">
                            {data?.start_date} - {data?.end_date}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-1 pt-3 border-t">
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 p-1 text-blue-600 hover:bg-blue-500/20"
                        >
                            <Edit size={15} />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 p-1 text-red-600 hover:bg-red-500/20"
                        >
                            <Trash2 size={15} />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 p-1 text-yellow-600 hover:bg-yellow-500/20"
                        >
                            <MessageSquare size={15} />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 p-1 text-green-600 hover:bg-green-500/20"
                        >
                            <UserPlus size={15} />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 p-1 text-purple-600 hover:bg-purple-500/20"
                        >
                            <Eye size={15} />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 p-1 text-gray-600 hover:bg-gray-500/20"
                        >
                            <ActionDropdown
                                options={[
                                    { key: "edit", onClick: openModal },
                                    { key: "delete", onClick: openModal },
                                ]}
                            />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Modal
                modalKey={`${GROUP}-add`}
                title={`Guruhni tahrirlash`}
                size="max-w-4xl"
            >
                <GroupCreate item={data ?? null} />
            </Modal>
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
