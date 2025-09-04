import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import SeeInView from "@/components/ui/see-in-view"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useEmployeeCols = () =>
    useMemo<ColumnDef<Employee>[]>(
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
            },
            {
                header: "Telefon",
                accessorKey: "phone",
                cell: ({ row }) => {
                    return formatPhoneNumber(row.original.phone)
                },
            },
            {
                header: "Role",
                accessorKey: "role_name",
                cell({ row }) {
                    return <span className="capitalize">{row.original.role_name}</span>
                },
            },
            {
                header: "Login",
                accessorKey: "username",
            },
            {
                header: "Filial",
                cell: ({ row }) => {
                    return row.original.branches.length < 2 ?
                        row.original.branches?.[0]?.name || "-"
                        : <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                >
                                    {`Filiallar (${row.original.branches.length})`}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2">
                                <div className="flex flex-col gap-1 text-sm ">
                                    {row.original.branches?.map((gr) => (
                                        <p
                                            key={gr.id}
                                            className={cn(
                                                "px-4 py-2 text-sm rounded flex items-center justify-between",
                                            )}
                                        >
                                            <span>{gr.name}</span>
                                        </p>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                },
            },
        ],
        [],
    )
