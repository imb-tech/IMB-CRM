import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { ATTENDANCE_STATIS_STUDENTS } from "@/constants/api-endpoints"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"
import {
    getStatusColor,
    getStatusIcon,
} from "@/pages/group-detail/attendance-select"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { PanelRightClose } from "lucide-react"
import { useMemo } from "react"

export function SheetDemo() {
    const search = useSearch({ from: "/_main/reports" })
    const { group, status, tabs, start_date, end_date, ...res } = search
    const navigate = useNavigate()
    const { isOpen, closeModal } = useModal("attendance-modal")
    const { store } = useStore<AttendancGroupDetail>("attendance-personal")

    const { data } = useGet<ListResp<AttendanceRecord>>(
        ATTENDANCE_STATIS_STUDENTS,
        {
            params: {
                ...res,
                group_student: store?.id,
                start_date,
                end_date,
            },
            options: { enabled: !!store?.id },
        },
    )


    return (
        <div>
            <div
                className={cn(
                    "w-[60%] h-screen overflow-y-auto no-scrollbar fixed !z-[50] top-0 -right-[100%] bg-card p-4 pt-4 shadow-lg transition-all duration-500",
                    isOpen ? "right-0" : "",
                )}
            >
                <Button
                    className="mb-4"
                    onClick={() => {
                        closeModal()
                        navigate({
                            to: "/reports",
                            search: (prev) => ({
                                ...prev,
                                group_student: undefined,
                            }),
                        })
                    }}
                >
                    <PanelRightClose />
                </Button>
                <div className="flex items-center gap-2">
                    <h1>
                        {store?.full_name}
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
            </div>
        </div>
    )
}

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
                header: "Sana",
                accessorKey: "date",
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
