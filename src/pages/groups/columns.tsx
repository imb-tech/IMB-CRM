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
                header: "O'qituvchi",
                accessorKey: "teacher_name",
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
                cell({
                    row: {
                        original: { students_count },
                    },
                }) {
                    return (
                        <div className="flex gap-2">
                            {students_count.active ?
                                <p className="text-primary bg-primary/20 px-2 rounded">
                                    {students_count.active}
                                </p>
                                : ""}
                            {students_count.new ?
                                <p className="text-orange-300 bg-orange-300/20 px-2 rounded">
                                    {students_count.new}
                                </p>
                                : ""}
                            {students_count.frozen ?
                                <p className="text-muted-foreground bg-muted-foreground/20 px-2 rounded">
                                    {students_count.frozen}
                                </p>
                                : ""}
                        </div>
                    )
                },
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
