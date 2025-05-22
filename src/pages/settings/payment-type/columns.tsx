import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const usePaymentTypeCols = () =>
    useMemo<ColumnDef<PaymentType>[]>(
        () => [
            {
                header: "№",
                cell: ({ row }) => row.index + 1,
            },
            {
                header: "Nomi",
                accessorKey: "name",
                enableSorting: true,
            },
        ],
        [],
    )
