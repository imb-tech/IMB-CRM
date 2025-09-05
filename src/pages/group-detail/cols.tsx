import Money from "@/components/elements/money"
import { formatMoney } from "@/lib/format-money"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { StatusPopover } from "./status-popover"
import { useModal } from "@/hooks/useModal"
import { useStore } from "@/hooks/use-store"
import { Check, Pencil } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import ActionDropdown from "@/components/elements/action-dropdown"
import { Link } from "@tanstack/react-router"
import useHistoryNavigate from "@/hooks/use-history-navigate"

export const useGroupStudentCols = () => {
    const { openModal } = useModal("update")
    const { setStore } = useStore("student-data")
    const { openModal: openDelete } = useModal("delete-student")
    const { openModal: pay } = useModal("payment-update")
    const { openModal: exportStudent } = useModal("export-student")
    const { openModal: note } = useModal("notes-add")
    const { push } = useHistoryNavigate()

    return useMemo<ColumnDef<GroupStudent>[]>(
        () => [
            {
                header: "FIO",
                accessorKey: "student_name",
                enableSorting: true,
                cell: ({ row: { original: { student_name, student } } }) => {
                    return <span
                        onClick={() => push(`/students/${student}/groups`)}
                        className="hover:text-primary cursor-pointer"
                    >{student_name}</span>
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
                        original,
                    },
                }) {
                    return (
                        <StatusPopover
                            student={original.id}
                            allowed_statuses={original.allowed_statuses}
                            status={original.status}
                            studentData={original as any}
                        />
                    )
                },
            },
            {
                header: "Qo'shilgan sana",
                accessorKey: "start_date"
            },
            {
                header: "Aktivlashgan sana",
                accessorKey: "activated_date"
            },
            {
                header: "Keyingi to'lov",
                accessorKey: "payment_date"
            },
            {
                header: "Balans",
                accessorKey: "balance",
                enableSorting: true,
                cell: ({ row }) => (
                    <Money value={Number(row.original.balance)} />
                ),
            },
            {
                header: " ",
                cell({ row: { original } }) {
                    return (
                        <ActionDropdown options={[
                            {
                                key: "edit",
                                onClick() {
                                    setStore(original)
                                    openModal()
                                },
                            },
                            {
                                key: "delete",
                                onClick() {
                                    setStore(original)
                                    openDelete()
                                },
                            },
                            {
                                key: "payment",
                                onClick() {
                                    setStore(original)
                                    pay()
                                },
                            },
                            {
                                key: "transfer",
                                onClick() {
                                    setStore(original)
                                    exportStudent()
                                },
                            },
                            {
                                key: "note",
                                onClick() {
                                    setStore(original)
                                    note()
                                },
                            },
                            {
                                key: "sms",
                                onClick() {
                                    setStore(original)
                                    openDelete()
                                },
                            }
                        ]} />
                    )
                },
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
                    return original.reason ?? "-"
                },
            },
            {
                header: "Xodim",
                accessorKey: "author_name",
                cell({ row: { original } }) {
                    return original.author_name ?? "-"
                },
            },
            {
                header: "Berilgan sana",
                accessorKey: "date",
                cell({ row: { original } }) {
                    return original.created_at ?
                        formatDate(original.created_at)
                        : "-"
                },
            },
        ],
        [],
    )

export const useGroupExamsCols = (
    clickAnswer: (t: string) => void,
    update: (id: number, score: string) => void,
) => {
    return useMemo<ColumnDef<GroupModuleStudent>[]>(
        () => [
            {
                header: "FISH",
                accessorKey: "full_name",
            },
            {
                header: "Javob",
                cell({ row: { original } }) {
                    return (
                        <div>
                            {original.answer ?
                                <Button
                                    className="text-primary"
                                    size="sm"
                                    onClick={() =>
                                        clickAnswer(original.answer as string)
                                    }
                                >
                                    Ko'rish
                                </Button>
                                : "—"}
                        </div>
                    )
                },
            },
            {
                header: "Yuborgan fayl",
                cell({ row: { original } }) {
                    return (
                        <div>
                            {original.file ?
                                <a
                                    href={original.file}
                                    target="_blank"
                                    className={buttonVariants({
                                        variant: "link",
                                    })}
                                >
                                    Ko'rish
                                </a>
                                : "—"}
                        </div>
                    )
                },
            },
            {
                header: "Ball",
                cell({ row: { original } }) {
                    const [value, setValue] = useState(original.is_scored ? original.score : "")
                    const [dirty, setDirty] = useState(false) // qiymat o'zgarganini belgilash

                    return (
                        <div className="relative w-auto inline-block">
                            <Input
                                type="number"
                                min={0}
                                value={value}
                                onChange={(e) => {
                                    const v = e.target.value
                                    if (original.score !== Number(v)) {
                                        setDirty(true)
                                    } else if (v == "") {
                                        update(original.id, v)
                                        setDirty(false)
                                    }
                                    setValue(v)
                                }}
                                className="rounded-sm h-10 max-w-28"
                                placeholder="—"
                            />
                            {dirty && (
                                <span className="absolute bg-background p-1 top-1/2 -translate-y-1/2 right-1 rounded-sm">
                                    <Check
                                        className="text-green-500 cursor-pointer"
                                        onClick={() => {
                                            update(original.id, value as string)
                                            setDirty(false) // check bosilganda ikonani yashirish
                                        }}
                                    />
                                </span>
                            )}
                        </div>
                    )
                },
            },
        ],
        [],
    )
}

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
