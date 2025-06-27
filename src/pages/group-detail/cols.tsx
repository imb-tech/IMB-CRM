import { formatMoney } from "@/lib/format-money"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useGroupStudentCols = () =>
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
                header: "Telefon",
                accessorKey: "phone",
                cell: ({ row }) => {
                    return formatPhoneNumber(row.original.phone)
                },
            },
            {
                header: "Holat",
                accessorKey: "rating",
                enableSorting: true,
                cell({ row }) {
                    return row.original.rating > 4.4 ?
                            <span className="text-xs bg-green-500/50 py-1 px-2 rounded-lg">
                                Aktiv
                            </span>
                        :   <span className="text-xs bg-gray-500/50 py-1 px-2 rounded-lg">
                                Muzlatilgan
                            </span>
                },
            },
            {
                header: "Balans",
                accessorKey: "balance",
                enableSorting: true,
                cell: ({ row }) => {
                    const v = row.original.balance
                    return formatMoney(
                        v,
                        v > 0 ? "text-green-500" : "text-red-500",
                    )
                },
            },
        ],
        [],
    )

export const useGroupSalesCols = () =>
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
                header: "Chegirma soni",
                accessorKey: "phone",
                cell: () => {
                    return 10
                },
            },
            {
                header: "Berilgan sana",
                accessorKey: "rating",
                cell: () => {
                    return "01-06-2025"
                },
            },
            {
                header: "Izoh",
                accessorKey: "balance",
                cell: () => {
                    return "Soxta ma'lumotalar bilan to'ldirildi"
                },
            },
            {
                header: "To'lov summasi",
                accessorKey: "balance",
                cell: () => {
                    return formatMoney(450000)
                },
            },
        ],
        [],
    )

export const useGroupExamsCols = () =>
    useMemo<ColumnDef<GroupExam>[]>(
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
            {
                header: "Topshirish sanasi",
                accessorKey: "take_date",
            },
            {
                header: "O'tish bali",
                accessorKey: "min_score",
            },
            {
                header: "Maksimal bal",
                accessorKey: "max_score",
            },
        ],
        [],
    )
