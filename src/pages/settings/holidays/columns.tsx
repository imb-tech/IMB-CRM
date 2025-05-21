import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useHolidaysCols = () =>
    useMemo<ColumnDef<Holiday>[]>(
        () => [
            {
                header: "№",
                cell: ({ row }) => row.index + 1,
            },
            {
                header: "Sana",
                accessorKey: "date",
            },
            {
                header: "Sabab",
                accessorKey: "reason",
                enableSorting: true,
            },
        ],
        [],
    )
