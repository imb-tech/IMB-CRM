import SeeInView from "@/components/ui/see-in-view"
import { CopyButton } from "@/lib/copy-button"
import { formatMoney } from "@/lib/format-money"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useStudentsCols = () =>
    useMemo<ColumnDef<Student>[]>(
        () => [
            {
                header: "Rasm",
                accessorKey: "face",
                cell: ({ row }) => (
                    <SeeInView
                        url={row.original.photo ?? "/images/user.png"}
                        className={
                            "object-cover h-9 min-w-9 max-w-9 rounded-md"
                        }
                    />
                ),
            },
            {
                header: "FIO",
                accessorKey: "full_name",
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
                header: "Login",
                accessorKey: "username",
                cell: ({ row }) => {
                    return CopyButton(row.original.username)
                },
            },
            {
                header: "Guruhlar",
                cell: ({ row }) => {
                    return (
                        <div className="flex flex-col gap-1">
                            {row.original.groups?.map((gr) => (
                                <p
                                    key={gr.id}
                                    className={cn(
                                        "p-1 text-xs rounded-sm flex items-center justify-between",
                                        gr.status == -1
                                            ? "bg-red-500/20 "
                                            : gr.status == 0
                                            ? "bg-orange-500/20 "
                                            : gr.status == 2
                                            ? "bg-gray-500/20 "
                                            : "bg-green-500/30 ",
                                    )}
                                >
                                    <span>{gr.name}</span>
                                    <span>{formatMoney(gr.balance)}</span>
                                </p>
                            ))}
                        </div>
                    )
                },
            },
            {
                header: "Balans",
                accessorKey: "balance",
                enableSorting: true,
                cell: ({ row }) => {
                    return formatMoney(row.original.balance)
                },
            },
        ],
        [],
    )
