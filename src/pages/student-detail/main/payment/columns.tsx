import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

export const useColumns = ({ isGroup }: { isGroup: boolean }) =>
    useMemo<ColumnDef<AllPaymentStudent>[]>(
        () => [
            {
                header: "Sana",
                accessorKey: "date",
                enableSorting: true,
                cell({ row }) {
                    return (
                        <p className="whitespace-nowrap">
                            {format(row.original.created_at, "yyyy-MM-dd")}
                        </p>
                    )
                },
            },
            {
                header: "To'lov turi",
                accessorKey: "payment_type",
                enableSorting: true,
            },
            {
                header: "Summa",
                accessorKey: "amount",
                enableSorting: true,
                cell: ({ row }) => formatMoney(row.original.amount),
            },
            ...(isGroup
                ? [
                      {
                          header: "Guruh",
                          accessorKey: "group",
                          enableSorting: true,
                      },
                  ]
                : []),
            {
                header: "Izoh",
                accessorKey: "comment",
                enableSorting: true,
            },
            {
                header: "Amliyot sanasi",
                accessorKey: "created_at",
                enableSorting: true,
                cell({ row }) {
                    return (
                        <p className="whitespace-nowrap">
                            {format(
                                row.original.created_at,
                                "yyyy-MM-dd HH:mm",
                            )}
                        </p>
                    )
                },
            },
            {
                header: "Qabul qildi",
                accessorKey: "received_by",
                enableSorting: true,
            },
        ],
        [isGroup],
    )
