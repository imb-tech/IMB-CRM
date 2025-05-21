import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

export const useOffersColumns = (): ColumnDef<Offers>[] => {
    return [
        {
            header: "№",
            cell: ({ row }) => row.index + 1,
        },
        {
            header: "Logist",
            accessorKey: "agent",
            enableSorting: true,
            cell: ({ row }) => row.original.agent?.full_name,
        },
        {
            header: "Narx",
            accessorKey: "price",
            enableSorting: true,
            cell: ({ row }) => formatMoney(Number(row.original.price)),
        },
        {
            header: "Yuklash sanasi",
            accessorKey: "load_date",
            cell: ({ row }) =>
                format(
                    row.original.load_date
                        ? row.original.load_date
                        : new Date(),
                    "yyyy-MM-dd",
                ),
        },
        {
            header: "Yurish sanasi",
            accessorKey: "start_date",
            cell: ({ row }) =>
                format(
                    row.original.start_date
                        ? row.original.start_date
                        : new Date(),
                    "yyyy-MM-dd",
                ),
        },
        {
            header: "Stansiya",
            accessorKey: "station",
             cell: ({ row }) => row.original?.station?.name || "--",
        },
        {
            header: "Yukni yopish darajasi",
            accessorKey: "agent",
              cell: ({ row }) => row.original?.agent?.completed_orders || 0,
        },
    ]
}
