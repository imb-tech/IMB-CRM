import { formatMoney } from "@/lib/format-money"
import { useNavigate } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumns = () => {
    const navigate = useNavigate()
    return useMemo<ColumnDef<Course>[]>(
        () => [
            {
                header: "Nomi",
                accessorKey: "name",
                enableSorting: true,
                cell: ({ row }) => (
                    <span
                        onClick={() =>
                            navigate({
                                to: "/groups/$id",
                                params: { id: "5" },
                            })
                        }
                        className="hover:text-primary"
                    >
                        {row.original.name}
                    </span>
                ),
            },
            {
                header: "Holati",
                accessorKey: "price",
                enableSorting: true,
            },
            {
                header: "O'qituvchi",
                accessorKey: "duration",
                enableSorting: true,
            },
            {
                header: "Dars kunlari",
                accessorKey: "branch",
                enableSorting: true,
            },
            {
                header: "Davomiyligi",
                accessorKey: "branch",
                enableSorting: true,
            },
            {
                header: "Fillial",
                accessorKey: "branch",
                enableSorting: true,
            },
            {
                header: "O'quvchi qoshilgan sana",
                accessorKey: "branch",
                enableSorting: true,
            },
            {
                header: "O'quvchi o'chirilgan sana",
                accessorKey: "branch",
                enableSorting: true,
            },
        ],
        [],
    )
}
