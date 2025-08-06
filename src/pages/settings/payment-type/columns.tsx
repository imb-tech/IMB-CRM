import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const usePaymentTypeCols = () =>
    useMemo<ColumnDef<PaymentType>[]>(
        () => [
            {
                header: "Nomi",
                accessorKey: "name",
                enableSorting: true,
                cell({ row }) {
                    return (
                        <p className="min-w-[180px] pl-3">
                            {row.original.name}
                        </p>
                    )
                },
            },
        ],
        [],
    )
