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

export const useGroupStudentCols = () => {
    const { openModal } = useModal("update")
    const { setStore } = useStore("student-data")
    const { openModal: openDelete } = useModal("delete-student")
    const { openModal: pay } = useModal("payment-update")

    return useMemo<ColumnDef<GroupStudent>[]>(
        () => [
            {
                header: "FIO",
                accessorKey: "student_name",
                enableSorting: true,
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
                header: "Qo'shilgan sana",
                cell: ({ row }) => {
                    return (
                        <div className="flex items-center gap-3">
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
                header: "Aktivlashgan sana",
                cell: ({ row: { original } }) => {
                    return (
                        <div>
                            {original.status == 0 ? <p className="bg-yellow-500/20 py-1 px-2 rounded-sm font-light inline text-xs">Kutilmoqda</p> : (
                                <div className="flex items-center gap-3">
                                    <p>{original.activated_date}</p>
                                    <Pencil
                                        size={16}
                                        onClick={() => {
                                            openModal()
                                            setStore(original)
                                        }}
                                        className="text-primary"
                                    />
                                </div>
                            )}
                        </div>
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
            {
                header: " ",
                cell({ row: { original } }) {
                    return (
                        <ActionDropdown options={[
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
                                    openDelete()
                                },
                            },
                            {
                                key: "note",
                                onClick() {
                                    setStore(original)
                                    openDelete()
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
