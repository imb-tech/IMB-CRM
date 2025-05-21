import { formatMoney } from "@/lib/format-money"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useEmployeeCols = () =>
    useMemo<ColumnDef<Employee>[]>(
        () => [
            {
                header: "№",
                cell: ({ row }) => row.index + 1,
            },
            {
                header: "FIO",
                accessorKey: "full_name",
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
                header: "Oylik",
                accessorKey: "salary",
                enableSorting: true,
                 cell: ({ row }) => {
                    return formatMoney(row.original.salary)
                },
            },
            {
                header: "Foiz ulush (%)",
                accessorKey: "percent",
                enableSorting: true,
            },
            {
                header: "Dars haqi",
                accessorKey: "lesson_fee",
                enableSorting: true,
                 cell: ({ row }) => {
                    return formatMoney(row.original.lesson_fee)
                },
            },
            {
                header: "Tug'ilgan sana",
                accessorKey: "birth_date",
                enableSorting: true,
            },
            {
                header: "Ishgan olingan sana",
                accessorKey: "hired_date",
            },
        ],
        [],
    )
