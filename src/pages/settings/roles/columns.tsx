import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useRolesCols = () =>
    useMemo<ColumnDef<Role>[]>(
        () => [
            {
                header: "№",
                cell: ({ row }) => row.index + 1,
            },
            {
                header: "Nomi",
                accessorKey: "name",
            },
            {
                header: "Ruxsatlar",
                accessorKey: "permissions",
                cell: ({ row }) => <span className="capitalize">{row.original.permissions.join(", ")}</span>,
            },
        ],
        [],
    )
