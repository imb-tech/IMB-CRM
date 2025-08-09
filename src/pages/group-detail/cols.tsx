import Money from "@/components/elements/money"
import { formatMoney } from "@/lib/format-money"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import StudentStatus from "../students/student-status"
import { StatusPopover } from "./status-popover"

export const useGroupStudentCols = () =>
    useMemo<ColumnDef<GroupStudent>[]>(
        () => [
            {
                header: "FIO",
                accessorKey: "student_name",
                enableSorting: true,
            },
            {
                header: "Qo'shilgan",
                accessorKey: "start_date",
            },
            {
                header: "Telefon",
                accessorKey: "phone",
                cell: ({ row }) => {
                    return formatPhoneNumber(row.original.student_phone)
                },
            },
            {
                header: "Holat",
                accessorKey: "rating",
                enableSorting: true,
                cell({
                    row: {
                        original: { status, allowed_statuses, id },
                    },
                }) {
                    return (
                        <StatusPopover
                            student={id}
                            allowed_statuses={allowed_statuses}
                            status={status}
                        />
                    )
                },
            },
            {
                header: "Balans",
                accessorKey: "balance",
                enableSorting: true,
                cell: ({ row }) => (
                    <Money value={Number(row.original.balance)} />
                ),
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
