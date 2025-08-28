import { formatMoney } from "@/lib/format-money"
import { useNavigate } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

export const useColumns = () => {
    const navigate = useNavigate()

    return useMemo<ColumnDef<DiscountStudent>[]>(
        () => [
            {
                header: "Guruh",
                accessorKey: "group_data",
                cell: ({ row }) => (
                    <span
                        onClick={() =>
                            navigate({
                                to: "/groups/$id/sale",
                                params: {
                                    id: String(row.original.group_data.id),
                                },
                            })
                        }
                        className="hover:text-primary cursor-pointer hover:underline"
                    >
                        {row.original?.group_data?.name}
                    </span>
                ),
            },
            {
                header: "FIO",
                accessorKey: "author_name",
                enableSorting: true,
            },
            {
                header: "Chegirma soni",
                accessorKey: "count",
                enableSorting: true,
            },
            {
                header: "Berilgan sana",
                accessorKey: "created_at",
                enableSorting: true,
                cell: ({ row }) =>
                    format(row.original.created_at, "yyyy-MM-dd"),
            },
            {
                header: "Izoh",
                accessorKey: "reason",
                enableSorting: true,
            },
            {
                header: "To'lov summasi",
                accessorKey: "branch",
                enableSorting: true,
                cell: ({ row }) => formatMoney(row.original.amount),
            },
        ],
        [navigate],
    )
}
