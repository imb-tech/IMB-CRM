import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumns = () =>
    useMemo<ColumnDef<Course>[]>(
        () => [
            {
                header: "Sana",
                accessorKey: "price",
                enableSorting: true,
                cell: ({ row }) => "2025-08-21 18:00",
            },
            {
                header: "Kim yuborgan",
                accessorKey: "duration",
                enableSorting: true,
                cell: ({ row }) => "Abdisamatov Ozodbek",
            },
            {
                header: "Xabar",
                accessorKey: "branch",
                enableSorting: true,
                cell: ({ row }) => "Imtihonda 100% lik yechgani uchun berilgan",
            },

        ],
        [],
    )
