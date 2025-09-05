import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useCols = () =>
    useMemo<ColumnDef<AttendancGroupDetail>[]>(
        () => [
            { 
                header: "Ism",
                accessorKey: "full_name",
                cell: ({ row }) => formatMoney(row.original.full_name),
            },
            {
                header: "Qatnashishlar",
                accessorKey: "present",
                cell: ({ row }) => formatMoney(row.original.present),
            },
            {
                header: "Dars qoldirishlar",
                accessorKey: "absent",
                cell: ({ row }) => formatMoney(row.original.absent),
            },
            {
                header: "Kechikishlar",
                accessorKey: "late",
                cell: ({ row }) => formatMoney(row.original.late),
            },
            {
                header: "Qilinmagan davomatlar",
                accessorKey: "unmarked",
                cell: ({ row }) => formatMoney(row.original.unmarked),
            },
            {
                header: "Batafsil",
                accessorKey: "id",
                cell: () => (
                    <span className="hover:underline hover:text-primary">
                        Batafsil
                    </span>
                ),
            },
        ],
        [],
    )
