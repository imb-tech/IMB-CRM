import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const usePaidSalaryReportUserCols = () => {
    return useMemo<ColumnDef<Cost>[]>(
        () => [
            {
                header: "Guruhi",
                accessorKey: "name",
                enableSorting: true,
                cell: () => "Frontend001",
            },
            {
                header: "O'quvchilar soni",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">{"16 ta"}</span>
                ),
            },
            {
                header: "Dasrslar soni",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">{"40 ta"}</span>
                ),
            },
            {
                header: "O'qitilgan darslar",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">{"100 ta"}</span>
                ),
            },
            {
                header: "Jarimalar soni",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">
                        {"6 000 000 so'm"}
                    </span>
                ),
            },
            {
                header: "Kurs narxi",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">
                        {"6 800 000 so'm"}
                    </span>
                ),
            },
            {
                header: "Ulushsiz summa",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">{"700 000 so'm"}</span>
                ),
            },
            {
                header: "O'qituvchi ulushi",
                accessorKey: "price",
                enableSorting: true,
                cell: () => <span className="whitespace-nowrap">{"7 ta"}</span>,
            },

            {
                header: "Hisoblangan summa",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">
                        {"7 000 000 so'm"}
                    </span>
                ),
            },
        ],
        [],
    )
}
