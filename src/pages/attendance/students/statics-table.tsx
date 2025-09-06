import { useNavigate, useSearch } from "@tanstack/react-router"
import { DataTable } from "@/components/ui/datatable"
import { Card, CardContent } from "@/components/ui/card"
import { useGet } from "@/hooks/useGet"
import { ATTENDANCE_STATIS_STUDENTS } from "@/constants/api-endpoints"
import { Badge } from "@/components/ui/badge"
import { formatMoney } from "@/lib/format-money"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils"
import {
    getStatusColor,
    getStatusIcon,
} from "@/pages/group-detail/attendance-select"

const StaticsTable = () => {
    const search = useSearch({ from: "/_main/attendance/_main/statics" })
    const { start_date, end_date, status } = search

    const { data } = useGet<ListResp<AttendanceRecord>>(
        ATTENDANCE_STATIS_STUDENTS,
        {
            params: { ...search },
            options: { enabled: !!status },
        },
    )
    const navigate = useNavigate()

    return (
        <Card>
            <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                    <Button
                        size={"sm"}
                        onClick={() => {
                            navigate({
                                to: "/reports",
                                search: (prev) => ({
                                    ...prev,
                                    tabs: "attendance",
                                }),
                            })
                        }}
                    >
                        <ArrowLeft size={18} />
                    </Button>

                    <h1>
                        {start_date} - {end_date} oraliqdagi davomat
                        statistikasi
                    </h1>
                    <Badge>{formatMoney(data?.count)}</Badge>
                </div>

                <DataTable
                    columns={columns()}
                    data={data?.results || []}
                    className="w-full"
                    wrapperClassName="mt-3"
                    numeration
                    paginationProps={{
                        totalPages: data?.total_pages,
                    }}
                />
            </CardContent>
        </Card>
    )
}

export default StaticsTable

const columns = () => {
    const statusKey: { [key: string]: string } = {
        "-1": "absent",
        "0": "unmarked",
        "1": "present",
        "2": "late",
    }

    return useMemo<ColumnDef<AttendanceRecord>[]>(
        () => [
            {
                header: "Guruh",
                accessorKey: "group_name",
            },
            {
                header: "Sana",
                accessorKey: "date",
            },
            {
                header: "O'quvchi",
                accessorKey: "student",
            },
            {
                header: "Holat",
                accessorKey: "status",
                cell({ row }) {
                    return (
                        <div
                            className={cn(
                                getStatusColor(
                                    statusKey[String(row.original.status)],
                                    "text",
                                ),
                                "p-2 rounded-lg flex items-center gap-2",
                            )}
                        >
                            {getStatusIcon(
                                statusKey[String(row.original.status)],
                                18,
                            )}
                            <span>
                                {
                                    {
                                        "-1": "Darsga qatnashmagan",
                                        "0": "Davomat qilinmagan",
                                        "1": "Vaqtida kelgan",
                                        "2": "Kech qoldi",
                                    }[String(row.original.status)]
                                }
                            </span>
                        </div>
                    )
                },
            },
            {
                header: "Sabab",
                accessorKey: "reason",
            },
            {
                header: "Xodim",
                accessorKey: "teacher",
            },
        ],
        [],
    )
}
