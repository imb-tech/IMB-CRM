import { formatPhoneNumber } from "@/lib/format-phone-number"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import GetSourceIcon from "../sources/get-source-icon"
import { format } from "date-fns"

export const useLeadArchiveCols = () => {
    return useMemo<ColumnDef<Lead>[]>(
        () => [
            {
                header: "Manba",
                accessorKey: "source",
                cell: ({ row }) => {
                    return (
                        <GetSourceIcon
                            icon={row.original.source_icon}
                            className="bg-transparent ml-2"
                            size={20}
                        />
                    )
                },
            },
            {
                header: "Ism",
                accessorKey: "name",
                cell: ({ row }) => {
                    return (
                        <div className="flex flex-col min-w-[200px] ">
                            <span> {row.original.name}</span>
                            <span className="whitespace-nowrap text-zinc-400">
                                {formatPhoneNumber(
                                    String(row.original.get_main_contact),
                                )}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: "Sana",
                accessorKey: "updated_at",
                cell: ({ row }) => {
                    return (
                        <div className="whitespace-nowrap min-w-[150px]">
                            {format(
                                row.original.updated_at,
                                "yyyy-MM-dd HH:mm",
                            )}
                        </div>
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
                        <div
                            className={cn(
                                "whitespace-nowrap min-w-[150px]",
                                val === "loosed"
                                    ? "text-red-500/70"
                                    : "text-green-500/70",
                            )}
                        >
                            {
                                {
                                    success: "Muvaffaqiyatli",
                                    loosed: "O'chirilgan",
                                    new: "Yangi",
                                }[val]
                            }
                        </div>
                    )
                },
            },
            {
                header: "Sabab",
                accessorKey: "reason",
                cell: ({ row }) => {
                    return (
                        <div className="max-w-lg ">{row.original.reason}</div>
                    )
                },
            },
        ],
        [],
    )
}
