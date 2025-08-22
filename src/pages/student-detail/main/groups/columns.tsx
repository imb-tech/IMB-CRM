import { daysMap } from "@/lib/shift-groupped"
import { studentStatusKeys } from "@/pages/students/student-status"
import { useNavigate } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

export const useColumns = () => {
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
                header: "Holati",
                accessorKey: "status",
                cell: ({ row }) => (
                    <span>{studentStatusKeys[row.original?.status]}</span>
                ),
            },
            {
                header: "O'qituvchi",
                accessorKey: "group_data",
                cell: ({ row }) => (
                    <span>{row.original?.group_data?.teacher}</span>
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
                    <span>
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
