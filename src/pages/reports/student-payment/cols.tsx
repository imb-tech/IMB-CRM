import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useCols = () =>
    useMemo<ColumnDef<{ id: number }>[]>(
        () => [
            {
                header: "FIO",
                accessorKey: "id",
            },
            {
                header: "To'lov summasi",
                accessorKey: "id",
            },
            {
                header: "To'lov sanasi",
                accessorKey: "id",
            },
            {
                header: "To'lov turi",
                accessorKey: "id",
            },
            {
                header: "Guruh",
                accessorKey: "id",
            },
            {
                header: "Izoh",
            },
            {
                header: "Xodim",
                accessorKey: "id",
            },
        ],
        [],
    )
