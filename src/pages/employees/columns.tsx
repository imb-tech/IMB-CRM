import SeeInView from "@/components/ui/see-in-view"
import { formatPhoneNumber } from "@/lib/format-phone-number"
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
            },
            {
                header: "Login",
                accessorKey: "username",
            },
            {
                header: "Filiallar",
                cell: ({ row }) => {
                    return (
                        <div className="flex flex-wrap gap-2">
                            {row?.original.branches?.map((br, i) => (
                                <p>
                                    {i > 0 ? "," : ""}
                                    {br.name}
                                </p>
                            ))}
                        </div>
                    )
                },
            },
        ],
        [],
    )
