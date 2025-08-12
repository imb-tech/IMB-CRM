import { formatPhoneNumber } from "@/lib/format-phone-number"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumns = () =>
    useMemo<ColumnDef<ParentStudent>[]>(
        () => [
            {
                header: "FIO",
                accessorKey: "full_name",
                enableSorting: true,
                cell({ row }) {
                    return <p className="min-w-[220px]">{row.original.full_name}</p>
                },
            },
            {
                header: "Telefon raqam",
                accessorKey: "price",
                enableSorting: true,
                cell: ({ row }) => formatPhoneNumber(row.original.phone),
            },
            {
                header: "Login",
                accessorKey: "username",
                enableSorting: true,
            },
        ],
        [],
    )
