import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"

export const useWarehouseCreateColumns = (): ColumnDef<WarehouseType>[] => {
    return [
        {
            header: "№",
            cell: ({ row }) => row.index + 1,
        },
        {
            header: "Mahsulot nomi",
            accessorKey: "id",
            cell: ({ row }) => row.original.load.product.name,
        },
        {
            header: "Umumiy miqdori",
            accessorKey: "id",
            cell: ({ row }) =>
                formatMoney(row.original.load.product_quantity) || "--",
        },
        {
            header: "Umumiy og'irligi",
            accessorKey: "id",
            cell: ({ row }) =>
                formatMoney(row.original.load.product_weight) || "--",
        },
    ]
}
