import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useCoursesCols = () =>
    useMemo<ColumnDef<Course>[]>(
        () => [
            {
                header: "Nomi",
                accessorKey: "name",
                enableSorting: true,
                cell({ row }) {
                    return <p className="min-w-[220px]">{row.original.name}</p>
                },
            },
            {
                header: "Kurs narxi",
                accessorKey: "price",
                enableSorting: true,
                cell: ({ row }) => formatMoney(row.original.price),
            },
            {
                header: "Kurs davomiyligi (oy)",
                accessorKey: "duration",
                enableSorting: true,
            },
            {
                header: "Filial",
                accessorKey: "branch",
                cell: ({ row }) => row.original.branch_name,
            },
        ],
        [],
    )
