import { formatDate, formatTime } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useBranchesCols = () =>
    useMemo<ColumnDef<Branch>[]>(
        () => [
            {
                header: "Nomi",
                accessorKey: "name",
                cell({ row }) {
                    return <p className="min-w-[220px]">{row.original.name}</p>
                },
            },
            {
                header: "Ish boshlanish vaqti",
                cell({ row: { original } }) {
                    return formatTime(original.start_time)
                },
            },
            {
                header: "Ish tugash vaqti",
                cell({ row: { original } }) {
                    return formatTime(original.end_time)
                },
            },
            {
                header: "Yaratilgan vaqti",
                cell({ row: { original } }) {
                    return formatDate(original.created_at)
                },
            },
        ],
        [],
    )
