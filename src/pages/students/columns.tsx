import SeeInView from "@/components/ui/see-in-view"
import { CopyButton } from "@/lib/copy-button"
import { formatMoney } from "@/lib/format-money"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

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
                    return row.original.groups.length < 2 ?
                            row.original.groups?.[0]?.name || "-"
                        :   <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                    >
                                        {`Guruhlar (${row.original.groups.length})`}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-2">
                                    <div className="flex flex-col gap-1 text-sm ">
                                        {row.original.groups?.map((gr) => (
                                            <p
                                                key={gr.id}
                                                className={cn(
                                                    "px-4 py-2 text-sm rounded flex items-center justify-between",
                                                    gr.status == -1 ?
                                                        "bg-red-500/20 "
                                                    : gr.status == 0 ?
                                                        "bg-orange-500/20 "
                                                    : gr.status == 2 ?
                                                        "bg-gray-500/20 "
                                                    :   "bg-green-500/30 ",
                                                )}
                                            >
                                                <span>{gr.name}</span>
                                                <span>
                                                    {formatMoney(gr.balance)}
                                                </span>
                                            </p>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                },
            },
            {
                header: "Filial",
                cell: ({ row }) => {
                    return row.original.branches_data.length < 2 ?
                            row.original.branches_data?.[0]?.name || "-"
                        :   <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                    >
                                        {`Filiallar (${row.original.branches_data.length})`}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-2">
                                    <div className="flex flex-col gap-1 text-sm ">
                                        {row.original.branches_data?.map(
                                            (gr) => (
                                                <p
                                                    key={gr.id}
                                                    className={cn(
                                                        "px-4 py-2 text-sm rounded flex items-center justify-between",
                                                    )}
                                                >
                                                    <span>{gr.name}</span>
                                                </p>
                                            ),
                                        )}
                                    </div>
                                </PopoverContent>
                            </Popover>
                },
            },
            {
                header: "Balans",
                accessorKey: "balance",
                enableSorting: true,
                cell: ({ row }) => {
                    const { balance } = row.original
                    return (
                        <span
                            className={
                                Number(balance) < 0 ? "text-red-500" : ""
                            }
                        >
                            {formatMoney(balance)}
                        </span>
                    )
                },
            },
        ],
        [],
    )
