import { formatPhoneNumber } from "@/lib/format-phone-number"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { useMemo } from "react"

export const useColumns = () =>
    useMemo<ColumnDef<SendMessage>[]>(
        () => [
            {
                header: "Kim yuborgan",
                accessorKey: "author_data",
                enableSorting: true,
                cell: ({ row }) => (
                    <span className="whitespace-nowrap">
                        {row.original.author_data.full_name}
                    </span>
                ),
            },
            {
                header: "Sana",
                accessorKey: "created_at",
                enableSorting: true,
                cell: ({ row }) => (
                    <span className="whitespace-nowrap">
                        {format(row.original.created_at, "yyyy-MM-dd HH:mm")}
                    </span>
                ),
            },
            {
                header: "Yuborilgan raqam",
                accessorKey: "phone",
                enableSorting: true,
                cell: ({ row }) => (
                    <span className="whitespace-nowrap">
                        {formatPhoneNumber(row.original.phone)}
                    </span>
                ),
            },
            {
                header: "Provider",
                accessorKey: "provider",
                enableSorting: true,
                cell: ({ row }) => (
                    <span className="whitespace-nowrap">
                        {row.original.provider}
                    </span>
                ),
            },
             {
                header: "Xabar",
                accessorKey: "message",
                enableSorting: true,
                cell: ({ row }) => (
                    <div className=" max-w-[500px]">
                        {row.original.message}
                    </div>
                ),
            },
            {
                header: "Holati",
                accessorKey: "status",
                enableSorting: true,
                cell: ({ row }) => (
                    <span
                        className={cn(
                            "whitespace-nowrap",
                            row.original.status === 0 && "text-orange-500",
                        )}
                    >
                        {row.original.status === 0
                            ? "Kutilmoqda..."
                            : "Muvaffaqiyatli"}
                    </span>
                ),
            },
        ],
        [],
    )
