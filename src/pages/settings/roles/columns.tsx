import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useRolesCols = () =>
    useMemo<ColumnDef<Role>[]>(
        () => [
            {
                header: "Nomi",
                accessorKey: "name",
                cell({ row }) {
                    return <span className="capitalize">{row.original.name}</span>
                },
            },
            {
                header: "Xodimlar soni",
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
