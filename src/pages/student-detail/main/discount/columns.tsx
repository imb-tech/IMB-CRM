import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumns = () =>
    useMemo<ColumnDef<Course>[]>(
        () => [
            {
                header: "FIO",
                accessorKey: "name",
                enableSorting: true,
                cell: ({ row }) => "Dilnoza Ismoilova",
            },
            {
                header: "Chegirma soni",
                accessorKey: "price",
                enableSorting: true,
                cell: ({ row }) => "13",
            },
            {
                header: "Berilgan sana",
                accessorKey: "duration",
                enableSorting: true,
                cell: ({ row }) => "2025-08-21",
            },
            {
                header: "Izoh",
                accessorKey: "branch",
                enableSorting: true,
                cell: ({ row }) => "Imtihonda 100% lik yechgani uchun berilgan",
            },
            {
                header: "To'lov summasi",
                accessorKey: "branch",
                enableSorting: true,
                cell: ({ row }) => "450 000",
            },
        ],
        [],
    )
