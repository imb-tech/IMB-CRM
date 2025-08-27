import { formatPhoneNumber } from "@/lib/format-phone-number"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import GetSourceIcon from "../sources/get-source-icon"

export const useLeadArchiveCols = () => {
    return useMemo<ColumnDef<Lead>[]>(
        () => [
            {
                header: "Ism",
                accessorKey: "name",
                cell: ({ row }) => {
                    return (
                        <div className="min-w-[200px]">{row.original.name}</div>
                    )
                },
            },
            {
                header: "Telefon",
                accessorKey: "get_main_contact",
                cell: ({ row }) => {
                    return (
                        <span className="">
                            {formatPhoneNumber(
                                String(row.original.get_main_contact),
                            )}
                        </span>
                    )
                },
            },
            {
                header: "Holati",
                accessorKey: "condition",
                enableSorting: true,
                cell: ({ row }) => {
                    const val = row.original.condition
                    return (
                        <span
                            className={cn(
                                val === "deleted"
                                    ? "text-rose-500/70"
                                    : "text-green-500/70",
                            )}
                        >
                            {
                                {
                                    deleted: "O'chirilgan",
                                    success: "Muvaffaqiyatli",
                                    connected: "Bog'lanildi",
                                    loosed: "Yo'qotildi",
                                    new: "Yangi",
                                }[val]
                            }
                        </span>
                    )
                },
            },
            {
                header: "Manba",
                accessorKey: "source",
                cell: ({ row }) => {
                    return (
                        <span className="flex items-center gap-1">
                            <GetSourceIcon
                                icon={row.original.source_icon}
                                className="bg-transparent"
                                size={16}
                            />
                            <span>{row.original.source_name}</span>
                        </span>
                    )
                },
            },
        ],
        [],
    )
}
