import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useMonthlyReportCols = () => {
    return useMemo<ColumnDef<Cost>[]>(
        () => [
            {
                header: "Yil",
                accessorKey: "name",
                enableSorting: true,
                cell: () => 2025,
            },
            {
                header: "Oy",
                accessorKey: "price",
                enableSorting: true,
                cell: () => "Sentabr",
            },
             {
                header: "Xodimlar",
                accessorKey: "price",
                enableSorting: true,
                cell: () => "16 ta",
            },
            {
                header: "O'zgarmas Oyliklar",
                accessorKey: "price",
                enableSorting: true,
                cell: () => <span className="whitespace-nowrap">{"16 000 000 so'm"}</span>,
            },
            {
                header: "Bonuslar",
                accessorKey: "price",
                enableSorting: true,
                cell: () => <span className="whitespace-nowrap">{"100 000 so'm"}</span>,
            },
            {
                header: "Jarimalar",
                accessorKey: "price",
                enableSorting: true,
                cell: () => <span className="whitespace-nowrap">{"1 600 000 so'm"}</span>,
            },
            {
                header: "Avanslar",
                accessorKey: "price",
                enableSorting: true,
                cell: () => <span className="whitespace-nowrap">{"600 000 so'm"}</span>,
            },
            {
                header: "Jami foizda (%)",
                accessorKey: "price",
                enableSorting: true,
               cell: () => <span className="whitespace-nowrap">{"6 800 000 so'm"}</span>,
            },
            {
                header: "Jami Oyliklar",
                accessorKey: "price",
                enableSorting: true,
               cell: () => <span className="whitespace-nowrap">{"23 700 000 so'm"}</span>,
            },
            {
                header: "Holat",
                accessorKey: "price",
                enableSorting: true,
                cell: () => "To'langan",
            },
            {
                header: "Kassir",
                accessorKey: "price",
                enableSorting: true,
                cell: () => "Abdisamatov Ozodbek",
            },
            {
                header: "Tahrirlangan sana",
                accessorKey: "price",
                enableSorting: true,
                cell: () => "2025-09-05",
            },
        ],
        [],
    )
}
