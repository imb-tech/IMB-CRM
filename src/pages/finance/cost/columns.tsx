import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

export const useCostCols = () =>
    useMemo<ColumnDef<Cost>[]>(
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
                    <span className="text-red-600 font-medium">
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
