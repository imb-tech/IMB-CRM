import { formatDate } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useRoomsCols = () =>
    useMemo<ColumnDef<Room>[]>(
        () => [
            {
                header: "Nomi",
                accessorKey: "name",
                cell({ row }) {
                    return <p className="min-w-[180px]">{row.original.name}</p>
                },
            },
            {
                header: "Yaratilgan vaqti",
                cell({ row: { original } }) {
                    return formatDate(original.created_at)
                },
            },
            {
                header: "O'quvchi sig'imi",
                accessorKey: "limit",
                enableSorting: true,
            },
            {
                header: "Filail",
                accessorKey: "branch_name",
                enableSorting: true,
            },
        ],
        [],
    )
