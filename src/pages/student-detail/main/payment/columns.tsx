import { formatMoney } from "@/lib/format-money"
import { useNavigate } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

export const useColumns = ({ isGroup }: { isGroup: boolean }) => {
    const navigate = useNavigate()
    return useMemo<ColumnDef<GroupStudentPayments>[]>(
        () => [
            {
                header: "Sana",
                accessorKey: "date",
                enableSorting: true,
                cell({ row }) {
                    return (
                        <p className="whitespace-nowrap">
                            {format(row.original.date, "yyyy-MM-dd")}
                        </p>
                    )
                },
            },
            {
                header: "To'lov turi",
                accessorKey: "payment_type_name",
                enableSorting: true,
            },
            {
                header: "Summa",
                accessorKey: "amount",
                enableSorting: true,
                cell: ({ row }) => formatMoney(row.original.amount),
            },
            ...(isGroup
                ? [
                      {
                          header: "Guruh",
                          accessorKey: "group_data",
                          enableSorting: true,
                          cell: ({ row }: any) => (
                              <span
                                  onClick={() =>
                                      navigate({
                                          to: "/groups/$id",
                                          params: { id: "5" },
                                      })
                                  }
                                  className="hover:text-primary cursor-pointer hover:underline"
                              >
                                  {row.original?.group_data?.name}
                              </span>
                          ),
                      },
                  ]
                : []),
            {
                header: "Izoh",
                accessorKey: "description",
                enableSorting: true,
            },
            {
                header: "Amliyot sanasi",
                accessorKey: "created_at",
                enableSorting: true,
                cell({ row }) {
                    return (
                        <p className="whitespace-nowrap">
                            {format(
                                row.original.created_at,
                                "yyyy-MM-dd HH:mm",
                            )}
                        </p>
                    )
                },
            },
            {
                header: "Qabul qildi",
                accessorKey: "author_data",
                enableSorting: true,
                cell({ row }) {
                    const { author_data } = row.original
                    return author_data ? (
                        <p className="whitespace-nowrap">
                            {author_data?.full_name}
                        </p>
                    ) : (
                        "-"
                    )
                },
            },
        ],
        [isGroup],
    )
}
