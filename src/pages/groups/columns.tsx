import { daysMap } from "@/lib/shift-groupped"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useGroupCols = () =>
    useMemo<ColumnDef<Group>[]>(
        () => [
            {
                header: "Guruh nomi",
                accessorKey: "name",
                enableSorting: true,
            },
            {
                header: "Kurs",
                accessorKey: "course_name",
            }, 
            {
                header: "Dars Kunlari",
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
                header: "O'quvchilar soni",
                accessorKey: "students_count.new",
                enableSorting: true,
            },
            {
                header: "Ochilgan",
                accessorKey: "start_date",
                enableSorting: true,
            },
            {
                header: "Yakunlandi",
                accessorKey: "end_date",
            },
            {
                header: "Holat",
                accessorKey: "status",
            },
        ],
        [],
    )
