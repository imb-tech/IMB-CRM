import { ColumnDef } from "@tanstack/react-table"

export const useRegionsColumns = (): ColumnDef<CountriesType>[] => {
     return [
        {
            header: "№",
            cell: ({ row }) => row.index + 1,
        },
        {
            header: "Nomi",
            accessorKey: "name",
            enableSorting: true,
        },
    ]
}
