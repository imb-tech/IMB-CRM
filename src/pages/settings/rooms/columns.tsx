import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useRoomsCols = () =>
    useMemo<ColumnDef<Room>[]>(
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
                header: "Filail",
                accessorKey: "branch",
                enableSorting: true,
            },
        ],
        [],
    )
