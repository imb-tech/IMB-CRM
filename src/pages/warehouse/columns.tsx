import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"

export const useWarehouseColumns = (): ColumnDef<WarehouseType>[] => {
    return [
        {
            header: "№",
            cell: ({ row }) => row.index + 1,
        },
        {
            header: "Mahsulot nomi",
            accessorKey: "id",
            enableSorting: true,
            cell: ({ row }) => row.original.load.product.name,
        },
        {
            header: "Umumiy miqdori",
            accessorKey: "id",
            enableSorting: true,
            cell: ({ row }) =>
                formatMoney(row.original.load.product_quantity) || "--",
        },
        {
            header: "Umumiy og'irligi",
            accessorKey: "id",
            enableSorting: true,
            cell: ({ row }) =>
                formatMoney(row.original.load.product_weight) || "--",
        },
        {
            header: "Mijoz ismi",
            accessorKey: "id",
            enableSorting: true,
            cell: ({ row }) => row.original.load.customer.full_name || "--",
        },
    ]
}
