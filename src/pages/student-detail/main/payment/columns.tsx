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
                header: "Turi",
                accessorKey: "type",
                enableSorting: true,
                cell: ({ row }) => (
                    <span className="whitespace-nowrap">
                        {row.original.type}
                    </span>
                ),
            },
            {
                header: "Summa",
                accessorKey: "amount",
                enableSorting: true,
                cell: ({ row }) => formatMoney(row.original.amount),
            },
            {
                header: "Qaytarilgan",
                accessorKey: "returned_amount",
                enableSorting: true,
                cell: ({ row }) => formatMoney(row.original.returned_amount),
            },
            {
                header: "Bonus",
                accessorKey: "bonus",
                enableSorting: true,
                cell: ({ row }) => formatMoney(row.original.bonus),
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
                header: "Yaratilgan sana",
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
                header: "To'lov turi",
                accessorKey: "payment_type",
                enableSorting: true,
            },
            {
                header: "Qabul qildi",
                accessorKey: "received_by",
                enableSorting: true,
            },
        ],
        [isGroup],
    )
