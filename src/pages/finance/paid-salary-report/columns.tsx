import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const usePaidSalaryReportCols = () => {
    return useMemo<ColumnDef<Cost>[]>(
        () => [
            {
                header: "FIO",
                accessorKey: "name",
                enableSorting: true,
                cell: () => "Abdisamatov Ozodbek",
            },
            {
                header: "O'zgarmas Oyliklar",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">
                        {"16 000 000 so'm"}
                    </span>
                ),
            },
            {
                header: "Foiz ulush (%)",
                accessorKey: "price",
                enableSorting: true,
                cell: () => <span className="whitespace-nowrap">{"40 %"}</span>,
            },
            {
                header: "Foiz ulush (so'm)",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">{"100 000 so'm"}</span>
                ),
            },
            {
                header: "Ish haqqi",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">
                        {"6 000 000 so'm"}
                    </span>
                ),
            },
            {
                header: "Jami foizda (%)",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">
                        {"6 800 000 so'm"}
                    </span>
                ),
            },
            {
                header: "Avanslar",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">{"700 000 so'm"}</span>
                ),
            },
            {
                header: "Jarimalar soni",
                accessorKey: "price",
                enableSorting: true,
                cell: () => <span className="whitespace-nowrap">{"7 ta"}</span>,
            },
            {
                header: "Bonuslar (so'm)",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">{"700 000 so'm"}</span>
                ),
            },
            {
                header: "Jarimalar (so'm)",
                accessorKey: "price",
                enableSorting: true,
                cell: () => (
                    <span className="whitespace-nowrap">{"800 000 so'm"}</span>
                ),
            },
            {
                header: "Yakuniy ish haqqi",
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
