import { useNavigate } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

export const useColumns = () => {
    const navigate = useNavigate()

    return useMemo<ColumnDef<Appropriation>[]>(
        () => [
            {
                header: "Nomi",
                accessorKey: "group_data.name",
                cell: ({ row }) => (
                    <span
                        onClick={() =>
                            navigate({
                                to: "/groups/$id",
                                params: { id: String(row.original.group_data.id) },
                            })
                        }
                        className="hover:text-primary cursor-pointer hover:underline"
                    >
                        {row.original?.group_data?.name}
                    </span>
                ),
            },

            {
                header: "Sana",
                accessorKey: "date",
                enableSorting: true,
                cell: ({ row }) => (
                    <span
                        onClick={() =>
                            navigate({
                                to: "/groups/$id",
                                params: { id: "5" },
                            })
                        }
                        className="hover:text-primary cursor-pointer"
                    >
                        {format(row.original?.date, "yyyy-MM-dd")}
                    </span>
                ),
            },
            {
                header: "Nomi",
                accessorKey: "module_data",
                cell: ({ row }) => (
                    <span>{row.original.module_data.title}</span>
                ),
            },
            {
                header: "Bahosi",
                accessorKey: "score",
                enableSorting: true,
                cell: ({ row }) => (
                    <span>{row.original.score || "Baholanmagan"}</span>
                ),
            },
            {
                header: "Ma'sul shaxs",
                accessorKey: "branch",
                cell: ({ row }) => (
                    <span>{row.original.module_data.controller}</span>
                ),
            },
        ],
        [],
    )
}
