import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import GetSourceIcon from "../sources/get-source-icon"

export const useLeadFormCols = () => {
    return useMemo<ColumnDef<LeadForm>[]>(
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
                header: "Bo'lim",
                accessorKey: "pipeline",
                cell: ({ row }) => {
                    return (
                        <div className="min-w-[200px]">
                            {row.original.pipeline_name}
                        </div>
                    )
                },
            },
            {
                header: "Tushgan lidlar soni",
                accessorKey: "leads_count",
                cell: ({ row }) => {
                    return (
                        <div className="min-w-[200px]">
                            {row.original.leads_count}
                        </div>
                    )
                },
            },
            {
                header: "Manba",
                accessorKey: "source",
                cell: ({ row }) => {
                    return (
                        row.original?.source_data && (
                            <span className="flex items-center gap-1">
                                <GetSourceIcon
                                    icon={row.original.source_data.icon}
                                    className="bg-transparent"
                                    size={16}
                                />
                                <span>{row.original.source_data.name}</span>
                            </span>
                        )
                    )
                },
            },
        ],
        [],
    )
}
