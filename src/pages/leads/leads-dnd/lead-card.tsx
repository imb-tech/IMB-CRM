import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"
import { Link, useParams } from "@tanstack/react-router"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import GetSourceIcon from "../sources/get-source-icon"
import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"
import axiosInstance from "@/services/axios-instance"

export default function LeadCard(props: Lead & { index: number }) {
    const {
        id,
        name,
        source_icon,
        source_name,
        worker_name,
        get_main_contact,
        index,
    } = props
    const { id: sourceId } = useParams({ strict: false })
    const { setStore } = useStore<Lead>("lead-data")

    const { setStore: setDelete } = useStore<{
        id: number
        type: "delete" | "success"
        name: string
    }>("conf-lead")

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
            to="/leads/$id/user/$user"
            params={{ id: sourceId as string, user: id.toString() }}
        >
            <Card className="group border rounded-lg overflow-hidden transition-all duration-300 bg-secondary dark:hover:shadow-slate-800/30">
                <CardContent className="p-4 relative flex items-start gap-2">
                    <span className="text-muted-foreground text-lg font-extralight">
                        {index + 1}
                    </span>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div>
                                    <h3 className="font-medium text-lg text-slate-900 dark:text-slate-100">
                                        {name}
                                    </h3>
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
                                                handleEdit()
                                            }}
                                        >
                                            Tahrirlash
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
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
                                            O'chirish
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4 pt-3 text-xs">
                            {/* <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                            <Calendar className="h-3 w-3" />
                            <span>{date}</span>
                        </div> */}
                            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                                <GetSourceIcon
                                    icon={source_icon}
                                    size={16}
                                    className="bg-transparent"
                                />
                                <span className="text-xs">{source_name}</span>
                            </div>
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
