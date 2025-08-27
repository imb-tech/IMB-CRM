import { Card, CardContent } from "@/components/ui/card"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"
import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { DataTable } from "@/components/ui/datatable"
import { Badge } from "@/components/ui/badge"

export default function StatsByEmployee() {
    const { start_date, end_date, pipeline } = useSearch({ from: "__root__" })
    const { data, isSuccess, isLoading } = useGet<MainLeadStats>(
        "leads/common/main-statistic",
        {
            params: { start_date, end_date, pipeline },
        },
    )

    return (
        <Card className="hover:shadow-lg border-none  h-full lg:col-span-7 ">
            <CardContent >
                <DataTable
                    numeration
                    columns={columns()}
                    data={(isSuccess && data.employees) || []}
                    loading={isLoading}
                    viewAll={true}
                    className="min-w-[600px]"
                    head={
                        <div className="flex items-center gap-3 mb-3">
                            <h1 className="text-xl font-medium ">
                                {"Sotuvchilar ro'yxati"}
                            </h1>
                            <Badge className="text-sm">
                                {formatMoney(data?.employees?.length)}
                            </Badge>
                        </div>
                    }
                />
            </CardContent>
        </Card>
    )
}

const columns = () => {
    return useMemo<ColumnDef<LeadStatEmploye>[]>(
        () => [
            {
                header: "FIO",
                accessorKey: "full_name",
                cell({ row }) {
                    return <span>{row.original.full_name}</span>
                },
            },
            {
                header: "Lidlar",
                accessorKey: "total",
                cell({ row }) {
                    return <span>{row.original.total}</span>
                },
            },
            {
                header: "Jarayonda",
                accessorKey: "progress",
                cell({ row }) {
                    return <span>{row.original.progress}</span>
                },
            },
            {
                header: "Sotildi",
                accessorKey: "success",
                cell({ row }) {
                    return <span>{row.original.success}</span>
                },
            },
            {
                header: "Yo'qotildi",
                accessorKey: "loosed",
                cell({ row }) {
                    return <span>{row.original.loosed}</span>
                },
            },
        ],
        [],
    )
}
