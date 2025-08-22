import { useNavigate } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumns = () => {
    const navigate = useNavigate()

    return useMemo<ColumnDef<Student>[]>(
        () => [
            {
                header: "Sana",
                accessorKey: "price",
                enableSorting: true,
                cell: ({ row }) => (
                    <span
                        onClick={() =>
                            navigate({
                                to: "/groups/$id",
                                params: { id: "5" },
                            })
                        }
                        className="hover:text-primary cursor-pointer"
                    >
                        {row.original?.group_data?.name}
                    </span>
                ),
            },
            {
                header: "Nomi",
                accessorKey: "price",
                enableSorting: true,
                cell: ({ row }) => "Buglarni to'g'irlash barchasini",
            },
            {
                header: "Bahosi",
                accessorKey: "duration",
                enableSorting: true,
                cell: ({ row }) => "85",
            },
            {
                header: "Ma'sul shaxs",
                accessorKey: "branch",
                enableSorting: true,
                cell: ({ row }) => "Abidsamatov Ozodbek",
            },
        ],
        [],
    )
}
