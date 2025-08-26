import { formatPhoneNumber } from "@/lib/format-phone-number"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumns = () =>
    useMemo<ColumnDef<StudentParents>[]>(
        () => [
            {
                header: "Ma'sul",
                accessorKey: "position",
                enableSorting: true,
            },
            {
                header: "FIO",
                accessorKey: "full_name",
                enableSorting: true,
            },
            {
                header: "Telefon raqam",
                accessorKey: "price",
                enableSorting: true,
                cell: ({ row }) => formatPhoneNumber(row.original.phone),
            },
        ],
        [],
    )
