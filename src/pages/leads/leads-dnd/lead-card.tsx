import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CircleCheckBig, Edit, MoreHorizontal, Trash } from "lucide-react"

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
import { formatMoney } from "@/lib/format-money"

export default function LeadCard(props: Lead & { index: number }) {
    const { id, name, source_icon, worker_name, get_main_contact, amount } =
        props

    const { id: sourceId } = useParams({ strict: false })
    const { setStore } = useStore<Lead>("lead-data")

    const { setStore: setDelete } = useStore<{
        id: number
        type: "delete" | "success"
        name: string
    }>("conf-lead")

    const { pipeline } = useSearch({ strict: false })
    const { openModal } = useModal()
    const { openModal: openDelete } = useModal("confirm-delete")

    async function handleEdit() {
        try {
            const resp = await axiosInstance.get<Lead>(`leads/crud/${id}/`)
            setStore({
                ...resp.data,
                contacts_list: resp.data?.contacts ?? [],
                contacts: undefined,
            })
            openModal()
        } catch (er) {
            console.log(er)
        }
    }

    return (
        <Link
            search={{ pipeline }}
            to="/leads/$id/user/$user"
            params={{ id: sourceId as string, user: id.toString() }}
        >
            <Card className="group border rounded-lg overflow-hidden transition-all duration-300 bg-secondary dark:hover:shadow-slate-800/30">
                <CardContent className="p-4">
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <GetSourceIcon
                                            icon={source_icon}
                                            size={16}
                                            className="bg-transparent"
                                        />
                                        <h3 className="font-medium text-lg text-slate-900 dark:text-slate-100">
                                            {name}
                                        </h3>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        {formatPhoneNumber(get_main_contact)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full transition-opacity duration-200 text-slate-500 hover:text-violet-500 dark:text-slate-400 dark:hover:text-violet-400"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <DropdownMenuItem
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setDelete({
                                                    id,
                                                    type: "success",
                                                    name: props.name,
                                                })
                                                openDelete()
                                            }}
                                        >
                                            <CircleCheckBig
                                                size={16}
                                                className="mr-2"
                                            />{" "}
                                            {"Muvaffaqiyatli"}
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleEdit()
                                            }}
                                        >
                                            <Edit size={16} className="mr-2" />{" "}
                                            {"Tahrirlash"}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-500"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setDelete({
                                                    id,
                                                    type: "delete",
                                                    name: props.name,
                                                })
                                                openDelete()
                                            }}
                                        >
                                            <Trash size={16} className="mr-2" />{" "}
                                            {"O'chirish"}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4 pt-3 text-xs ">
                            <p className=" dark:text-slate-300 text-sm">
                                {formatMoney(amount)} {"so'm"}
                            </p>
                            <Badge
                                className={cn(
                                    "ml-auto cursor-pointer transition-colors duration-200 text-xs font-normal bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400 hover:bg-emerald-500/20",
                                )}
                            >
                                {worker_name}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
