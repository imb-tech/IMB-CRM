import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useCoursesCols = () =>
    useMemo<ColumnDef<Course>[]>(
        () => [
            {
                header: "№",
                cell: ({ row }) => row.index + 1,
            },
            {
                header: "Nomi",
                accessorKey: "name",
                enableSorting: true,
            },
            {
                header: "Izoh",
                accessorKey: "description",
                enableSorting: true,
            },
            {
                header: "Kurs narxi",
                accessorKey: "price",
                enableSorting: true,
                cell: ({ row }) => formatMoney(row.original.price),
            },
            {
                header: "Filial",
                accessorKey: "branch",
                cell: ({ row }) => row.original.branch.name,
            },
            {
                header: "Kurs davomiyligi (oy)",
                accessorKey: "month_duration",
                enableSorting: true,
            },
        ],
        [],
    )
