import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useRolesCols = () =>
    useMemo<ColumnDef<Role>[]>(
        () => [
            {
                header: "Nomi",
                accessorKey: "name",
            },
            {
                header: "Hodimlar soni",
                accessorKey: "employees_count",
            },
            {
                header: "Ruxsatlar",
                accessorKey: "permissions",
                cell: ({ row }) => (
                    <span className="capitalize">
                        {row.original.permissions?.join?.(", ")}
                    </span>
                ),
            },
        ],
        [],
    )
