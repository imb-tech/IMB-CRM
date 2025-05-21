import { ColumnDef } from "@tanstack/react-table"

export const useCitiesColumns = (): ColumnDef<CitiesType>[] => {
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
