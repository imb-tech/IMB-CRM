import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumns = () =>
    useMemo<ColumnDef<Course>[]>(
        () => [
            {
                header: "Sana",
                accessorKey: "name",
                enableSorting: true,
                cell: ({ row }) => "2025-08-21",
            },
            {
                header: "Turi",
                accessorKey: "price",
                enableSorting: true,
                cell: ({ row }) => "Guruhga qo'shildi",
            },
            {
                header: "Izoh",
                accessorKey: "duration",
                enableSorting: true,
                cell: ({ row }) =>
                    "Sinov darsi uchun guruhga qo'shilgan o'quvchi",
            },
            {
                header: "Hodim",
                accessorKey: "branch",
                enableSorting: true,
                cell: ({ row }) => "Abidsamatov Ozodbek",
            },
        ],
        [],
    )
