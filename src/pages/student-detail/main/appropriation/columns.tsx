import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumns = () =>
    useMemo<ColumnDef<AllPaymentStudent>[]>(
        () => [
            {
                header: "Sana",
                accessorKey: "price",
                enableSorting: true,
                cell: ({ row }) => "2025-08-21",
            },
            {
                header: "Nomi",
                accessorKey: "price",
                enableSorting: true,
                cell: ({ row }) => "Buglarni to'g'irlash barchasini",
            },
            {
                header: "Bahosi",
                accessorKey: "duration",
                enableSorting: true,
                cell: ({ row }) => "85",
            },
            {
                header: "Ma'sul shaxs",
                accessorKey: "branch",
                enableSorting: true,
                cell: ({ row }) => "Abidsamatov Ozodbek",
            },
        ],
        [],
    )
