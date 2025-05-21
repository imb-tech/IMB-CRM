import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useGroupCols = () =>
    useMemo<ColumnDef<Group>[]>(
        () => [
            {
                header: "№",
                cell: ({ row }) => row.index + 1,
            },
            {
                header: "Guruh nomi",
                accessorKey: "groupName",
                enableSorting: true,
            },
            {
                header: "Kurs",
                accessorKey: "course",
            },
            {
                header: "Dars Kunlari",
                accessorKey: "lessonDays",
            },
            {
                header: "Dars vaqti",
                accessorKey: "lessonTime",
            },
            {
                header: "O'quvchilar soni",
                accessorKey: "studentCount",
                enableSorting: true,
            },
            {
                header: "Ochilgan",
                accessorKey: "startDate",
                enableSorting: true,
            },
            {
                header: "Yakunlandi",
                accessorKey: "endDate",
            },
            {
                header: "Holat",
                accessorKey: "status",
            },
        ],
        [],
    )
