import Money from "@/components/elements/money"
import { formatMoney } from "@/lib/format-money"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { StatusPopover } from "./status-popover"
import { useModal } from "@/hooks/useModal"
import { useStore } from "@/hooks/use-store"
import { Pencil } from "lucide-react"
import { Input } from "@/components/ui/input"

export const useGroupStudentCols = () => {
    const { openModal } = useModal("update")
    const { setStore } = useStore("student-data")

    return useMemo<ColumnDef<GroupStudent>[]>(
        () => [
            {
                header: "FIO",
                accessorKey: "student_name",
                enableSorting: true,
            },
            {
                header: "Qo'shilgan",
                cell: ({ row }) => {
                    return (
                        <div className="flex justify-between items-center">
                            <p>{row.original.start_date}</p>
                            <Pencil
                                size={16}
                                onClick={() => {
                                    openModal()
                                    setStore(row.original)
                                }}
                                className="text-primary"
                            />
                        </div>
                    )
                },
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
}

export const useGroupSalesCols = () =>
    useMemo<ColumnDef<StudentMergeDiscount>[]>(
        () => [
            {
                header: "FIO",
                accessorKey: "student_name",
            },
            {
                header: "Chegirma soni",
                accessorKey: "count",
                cell({ row: { original } }) {
                    return original.count ?? "-"
                },
            },
            {
                header: "To'lov summasi",
                cell: ({
                    row: {
                        original: { amount },
                    },
                }) => {
                    return amount ? formatMoney(amount) : "-"
                },
            },
            {
                header: "Izoh",
                accessorKey: "reason",
                cell({ row: { original } }) {
                    return original.count ?? "-"
                },
            },
            {
                header: "Xodim",
                accessorKey: "author_name",
                cell({ row: { original } }) {
                    return original.count ?? "-"
                },
            },
            {
                header: "Berilgan sana",
                accessorKey: "date",
                cell({ row: { original } }) {
                    return original.count ?? "-"
                },
            },
        ],
        [],
    )

export const useGroupExamsCols = () =>
    useMemo<ColumnDef<GroupStudent>[]>(
        () => [
            {
                header: "FISH",
                accessorKey: "student_name",
            },
            {
                header: "Natija",
                accessorKey: "max_score",
                cell() {
                    return (
                        <Input type="number" className="h-8" placeholder="0" />
                    )
                },
            },
        ],
        [],
    )

export const useGroupScoreCols = () =>
    useMemo<ColumnDef<GroupStudent>[]>(
        () => [
            {
                header: "F.I.SH",
                accessorKey: "student_name",
                enableSorting: true,
            },
            {
                header: "Natija",
                accessorKey: "balance",
            },
        ],
        [],
    )
