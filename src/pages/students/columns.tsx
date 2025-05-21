import { formatMoney } from "@/lib/format-money"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useStudentsCols = () =>
    useMemo<ColumnDef<Student>[]>(
        () => [
            {
                header: "№",
                cell: ({ row }) => row.index + 1,
            },
            {
                header: "FIO",
                accessorKey: "name",
                enableSorting: true,
            },
            {
                header: "Baho",
                accessorKey: "rating",
                enableSorting: true,
            },
            {
                header: "Telefon",
                accessorKey: "phone",
                cell: ({ row }) => {
                    return formatPhoneNumber(row.original.phone)
                },
            },
            {
                header: "Guruhlar",
                accessorKey: "groups",
                enableSorting: true,
            },
            {
                header: "Balans",
                accessorKey: "balance",
                enableSorting: true,
                cell: ({ row }) => {
                    return formatMoney(row.original.balance)
                },
            },
        ],
        [],
    )
