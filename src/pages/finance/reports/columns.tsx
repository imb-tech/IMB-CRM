import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { useSearch } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

export const useCostAndIncomeCols = () => {
    const search = useSearch({ from: "/_main/finance/" })
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
                    <span
                        className={cn(
                            "text-red-600 font-medium",
                            search.tabs === "income" && "text-green-600",
                        )}
                    >
                        {search.tabs === "income" ? "" : "-"}
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
        [search],
    )
}
