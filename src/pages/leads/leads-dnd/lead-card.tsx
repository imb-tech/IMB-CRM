import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Edit,
    MessageSquareText,
    MoreHorizontal,
    NotebookPen,
    RefreshCcw,
    Replace,
    Trash,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"
import { Link, useParams, useSearch } from "@tanstack/react-router"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import GetSourceIcon from "../sources/get-source-icon"
import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"
import axiosInstance from "@/services/axios-instance"
import { format } from "date-fns"

export default function LeadCard(props: Lead & { index: number }) {
    const { id, name, source_icon, worker_name, get_main_contact, updated_at } =
        props

    const { id: sourceId } = useParams({ strict: false })
    const { pipeline } = useSearch({ strict: false })

    const { setStore } = useStore<Lead>("lead-data")
    const open = {
        group: useModal("student-groups-add").openModal,
        message: useModal("message-add").openModal,
        note: useModal("notes-add").openModal,
        department: useModal("update-department").openModal,
        delete: useModal("confirm-delete").openModal,
        edit: useModal().openModal,
    }

    const handleEdit = async () => {
        try {
            const resp = await axiosInstance.get<Lead>(`leads/crud/${id}/`)
            setStore({
                ...resp.data,
                contacts_list: resp.data?.contacts ?? [],
                contacts: undefined,
            })
            open.edit()
        } catch (err) {
            console.error(err)
        }
    }

    const actions = [
        {
            label: "Eslatma qo'shish",
            icon: <NotebookPen size={16} className="text-sky-500 mr-2" />,
            onClick: () => open.note(),
        },
        {
            label: "SMS yuborish",
            icon: (
                <MessageSquareText size={16} className="text-yellow-500 mr-2" />
            ),
            onClick: () => open.message(),
        },
        {
            label: "Boshqa bo'limga",
            icon: <RefreshCcw size={16} className="text-indigo-500 mr-2" />,
            onClick: () => open.department(),
        },
        {
            label: "Guruhga qo'shish",
            icon: <Replace size={16} className="text-emerald-600 mr-2" />,
            onClick: () => open.group(),
        },
        {
            label: "Tahrirlash",
            icon: <Edit size={16} className="text-primary mr-2" />,
            onClick: handleEdit,
        },
        {
            label: "O'chirish",
            icon: <Trash size={16} className="text-red-600 mr-2" />,
            onClick: () => open.delete(),
            className: "text-red-600",
        },
    ]

    return (
        <Link
            search={{ pipeline }}
            to="/leads/varonka/$id/user/$user"
            params={{ id: sourceId!, user: id.toString() }}
        >
            <Card className="group border rounded-lg overflow-hidden transition-all duration-300 bg-secondary dark:hover:shadow-slate-800/30">
                <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <GetSourceIcon
                                            icon={source_icon}
                                            size={18}
                                            className="bg-transparent"
                                        />
                                        <h3 className="font-medium  text-slate-900 dark:text-slate-100">
                                            {name}
                                        </h3>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        {formatPhoneNumber(get_main_contact)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full text-slate-500 hover:text-violet-500 dark:text-slate-400 dark:hover:text-violet-400"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="center"
                                className="w-48"
                            >
                                {actions.map(
                                    ({ label, icon, onClick, className }) => (
                                        <DropdownMenuItem
                                            key={label}
                                            className={cn(className)}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setStore(props)
                                                onClick()
                                            }}
                                        >
                                            {icon} {label}
                                        </DropdownMenuItem>
                                    ),
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-4 mt-2 pt-3 text-xs">
                        <p className="text-xs dark:text-slate-300">
                            {format(updated_at, "yyyy-MM-dd HH:mm")}
                        </p>
                        <Badge className="ml-auto text-xs font-normal bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary hover:bg-primary/20">
                            {worker_name}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
