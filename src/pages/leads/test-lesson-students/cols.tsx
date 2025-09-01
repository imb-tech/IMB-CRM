import { formatPhoneNumber } from "@/lib/format-phone-number"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import StudentStatus from "@/pages/students/student-status"
import { formatMoney } from "@/lib/format-money"

export const useLeadTestStudentCols = () => {
    const navigate = useNavigate()

    return useMemo<ColumnDef<GroupStudentTestStudents>[]>(
        () => [
            {
                header: "FIO",
                accessorKey: "student_data",
                cell: ({
                    row: {
                        original: {
                            student_data: { full_name, id, phone },
                        },
                    },
                }) => {
                    return (
                        <Link
                            to="/students/$id/groups"
                            className="hover:text-primary cursor-pointer hover:underline"
                            params={{ id: id?.toString() }}
                        >
                            {full_name}
                        </Link>
                    )
                },
            },
            {
                header: "Telefon",
                accessorKey: "student_data",
                cell: ({ row }) => {
                    return formatPhoneNumber(row.original.student_data.phone)
                },
            },
            {
                header: "Guruh",
                accessorKey: "group_data",
                cell: ({ row }) => (
                    <span
                        onClick={() =>
                            navigate({
                                to: "/groups/$id",
                                params: {
                                    id: String(row.original.group_data?.id),
                                },
                            })
                        }
                        className="hover:text-primary cursor-pointer hover:underline"
                    >
                        {row.original?.group_data?.name}
                    </span>
                ),
            },
            {
                header: "Holat",
                accessorKey: "status",
                cell({
                    row: {
                        original: { status },
                    },
                }) {
                    return <StudentStatus status={status} />
                },
            },
            {
                header: "Balans",
                accessorKey: "group_data",
                cell({
                    row: {
                        original: { group_data },
                    },
                }) {
                    return (
                        <span
                            className={
                                Number(group_data?.balance) < 0
                                    ? "text-red-500"
                                    : ""
                            }
                        >
                            {formatMoney(group_data?.balance)}
                        </span>
                    )
                },
            },
            {
                header: "Qo'shilgan sana",
                accessorKey: "start_date",
            },
            {
                header: "Aktivlashgan sana",
                accessorKey: "activated_date",
            },
        ],
        [navigate],
    )
}
