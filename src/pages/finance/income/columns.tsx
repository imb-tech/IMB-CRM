import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

export const useIncomeCols = () => {
    return useMemo<ColumnDef<Cost>[]>(
        () => [
            {
                header: "Nomi",
                accessorKey: "name",
                enableSorting: true,
            },
            {
                header: "Summa",
                accessorKey: "price",
                enableSorting: true,
                cell: ({ row }) => (
                    <span className={cn("text-green-600")}>
                        {formatMoney(row.original.price)}
                    </span>
                ),
            },
            {
                header: "Izoh",
                accessorKey: "reason",
                enableSorting: true,
            },
            {
                header: "Sana",
                accessorKey: "created_at",
                cell: ({ row }) =>
                    format(row.original.created_at, "yyyy-HH-mm HH:mm"),
            },
        ],
        [],
    )
}
