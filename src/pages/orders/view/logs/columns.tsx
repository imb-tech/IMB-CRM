import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { statusColor, statusText } from "../.."

export const useLogsColumns = (): ColumnDef<Logs>[] => {
    return [
        {
            header: "№",
            cell: ({ row }) => row.index + 1,
        },
        {
            header: "Yuklash statusi",
            accessorKey: "agent",
            cell: ({ row }) => (
                <span className={statusColor[row.original.status]}>
                    {statusText[row.original.status]}
                </span>
            ),
        },
        {
            header: "Sababi",
            accessorKey: "hint",
            enableSorting: true,
            cell: ({ row }) => row.original.hint || "--",
        },
        {
            header: "O'zgarish vaqti",
            accessorKey: "changed_at",
            cell: ({ row }) =>
                format(
                    row.original.changed_at
                        ? row.original.changed_at
                        : new Date(),
                    "yyyy-MM-dd HH:mm",
                ),
        },
        {
            header: "O'zgartirilgan logist",
            accessorKey: "agent",
            cell: ({ row }) => row.original?.agent?.name || "--",
        },
    ]
}
