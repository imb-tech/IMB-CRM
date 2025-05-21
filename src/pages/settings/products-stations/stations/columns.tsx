import { ColumnDef } from "@tanstack/react-table"

export const useStationsColumns = (): ColumnDef<StationsType>[] => {
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
