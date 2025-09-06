import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

export const useAdvancesCols = () => {
    return useMemo<ColumnDef<Advance>[]>(
        () => [
            {
                header: "Xodim",
                accessorKey: "advance_owner_name",
                enableSorting: true,
            },
            {
                header: "Summa",
                accessorKey: "amount",
                enableSorting: true,
                cell: ({ row }) => (
                    <span>{formatMoney(row.original.amount)} so'm</span>
                ),
            },
            {
                header: "Berilgan sana",
                accessorKey: "date",
                cell: ({ row }) => format(row.original.date, "yyyy-HH-mm"),
            },
            {
                header: "Izoh",
                accessorKey: "body",
                enableSorting: true,
            },
            {
                header: "Ma'sul shaxs",
                accessorKey: "author_name",
            },
            {
                header: "Yaratilgan sana",
                accessorKey: "created_at",
                cell: ({ row }) =>
                    format(row.original.created_at, "yyyy-HH-mm HH:mm"),
            },
        ],
        [],
    )
}
