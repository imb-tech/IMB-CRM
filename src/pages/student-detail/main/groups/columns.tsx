import { daysMap } from "@/lib/shift-groupped"
import { useNavigate } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"
import { StatusPopoverStudent } from "./status-update"
import { Pencil } from "lucide-react"
import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"

export const useColumns = ({
    openModal,
    setCurrent,
}: {
    setCurrent: (item: Student) => void
    openModal: () => void
}) => {
    const navigate = useNavigate() 
    return useMemo<ColumnDef<Student>[]>(
        () => [
            {
                header: "Nomi",
                accessorKey: "group_data.name",
                cell: ({ row }) => (
                    <span
                        onClick={() =>
                            navigate({
                                to: "/groups/$id",
                                params: { id: String(row.original.id) },
                            })
                        }
                        className="hover:text-primary cursor-pointer hover:underline" 
                    >
                        {row.original?.group_data?.name}
                    </span>
                ),
            },
            {
                header: "Holat",
                accessorKey: "status",
                enableSorting: true,
                cell({
                    row: {
                        original: { status, id, allowed_statuses },
                    },
                }) {
                    return (
                        <StatusPopoverStudent
                            group={id}
                            allowed_statuses={allowed_statuses}
                            status={Number(status)}
                        />
                    )
                },
            },
            {
                header: "O'qituvchi",
                accessorKey: "group_data",
                cell: ({ row }) => (
                    <span>{row.original?.group_data?.teacher}</span>
                ),
            },
            {
                header: "Balans",
                accessorKey: "balance",
                cell: ({ row }) => (
                    <span
                        className={cn(
                            Number(row.original?.balance) < 0 && "text-red-500",
                        )}
                    >
                        {formatMoney(row.original?.balance)}
                    </span>
                ),
            },

            {
                header: "Dars kunlari",
                accessorKey: "shifts_data",
                cell({ row: { original } }) {
                    return (
                        <div>
                            {original.shifts_data
                                ?.map((d) => daysMap[d.day_of_week])
                                ?.join(", ")}
                        </div>
                    )
                },
            },
            {
                header: "Davomiyligi",
                accessorKey: "group_data",
                cell: ({ row }) => (
                    <span className="whitespace-nowrap">
                        {row.original?.group_data?.start_date} -{" "}
                        {row.original?.group_data?.end_date}
                    </span>
                ),
            },
            {
                header: "Fillial",
                accessorKey: "group_data",
                cell: ({ row }) => (
                    <span>{row.original?.group_data?.branch}</span>
                ),
            },
            {
                header: "O'quvchi qoshilgan sana",
                accessorKey: "start_date",
                cell: ({ row }) => {
                    return (
                        <div
                            onClick={() => {
                                openModal()
                                setCurrent(row.original)
                            }}
                            className="flex items-center gap-3 cursor-pointer hover:text-primary"
                        >
                            <p>{row.original.start_date}</p>
                            <Pencil size={15} className="text-primary" />
                        </div>
                    )
                },
            },
            {
                header: "O'quvchi o'chirilgan sana",
                accessorKey: "deleted_at",
                cell: ({ row }) => (
                    <span>
                        {format(row.original?.deleted_at, "yyyy-MM-dd")}
                    </span>
                ),
            },
        ],
        [],
    )
}
