import { Button } from "@/components/ui/button"
import SeeInView from "@/components/ui/see-in-view"
import { SALARIES } from "@/constants/api-endpoints"
import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"
import { formatMoney } from "@/lib/format-money"
import { ColumnDef } from "@tanstack/react-table"
import { Pencil } from "lucide-react"
import { useMemo } from "react"

export const useEmployeeSalaryCols = () => {
    const { openModal } = useModal(`${SALARIES}-add`)
    const { setStore } = useStore(`${SALARIES}-data`)

    return useMemo<ColumnDef<EmployeeSalary>[]>(
        () => [
            {
                header: "Rasm",
                accessorKey: "face",
                cell: ({ row }) => (
                    <SeeInView
                        url={row.original.photo ?? "/images/user.png"}
                        className={
                            "object-cover h-9 min-w-9 max-w-9 rounded-md"
                        }
                    />
                ),
            },
            {
                header: "FIO",
                accessorKey: "full_name",
            },
            {
                header: "Role",
                accessorKey: "role_name",
            },
            {
                header: "Fixed maosh",
                cell: ({ row }) =>
                    formatMoney(row.original?.static_salary, undefined, "so'm"),
            },
            {
                header: "Foiz ulush (%)",
                cell: ({ row }) =>
                    formatMoney(
                        row.original?.percentage_salary,
                        undefined,
                        "%",
                    ),
            },
            {
                header: "O'quvchi soni bo'yicha",
                cell: ({ row }) =>
                    formatMoney(
                        row.original?.per_student_salary,
                        undefined,
                        "so'm",
                    ),
            },
            {
                header: " ",
                cell: ({ row }) => {
                    return (
                        <div className="flex flex-wrap gap-2">
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => {
                                    setStore(row.original)
                                    openModal()
                                }}
                            >
                                <Pencil size={14} />
                            </Button>
                        </div>
                    )
                },
            },
        ],
        [],
    )
}
