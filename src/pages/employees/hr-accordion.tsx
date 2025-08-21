import { useGet } from "@/hooks/useGet"
import { DataTable } from "@/components/ui/datatable"
import { EMPLOYEE, OPTION_ROLES } from "@/constants/api-endpoints"
import { useEmployeeCols } from "./columns"
import { Badge } from "@/components/ui/badge"
import EmployeesHeader from "./employees-header"
import { useModal } from "@/hooks/useModal"
import { Dispatch, SetStateAction } from "react"

type Props = {
    loading?: boolean
    users?: Employee[]
    setCurrent: Dispatch<SetStateAction<Employee | null>>
}

function HrAccordion({ loading, users, setCurrent }: Props) {
    const { data } = useGet<RoleOption[]>(OPTION_ROLES)
    const { openModal } = useModal(`${EMPLOYEE}-add`)
    const { openModal: openDelete } = useModal(`${EMPLOYEE}-delete`)

    const columns = useEmployeeCols()

    return (
        <div className="overflow-x-auto hidden lg:block">
            <div className="w-full">
                <EmployeesHeader allEmployes={data?.length} />

                <DataTable
                    numeration
                    columns={columns}
                    loading={loading}
                    viewAll
                    data={users}
                    skeletonRowCount={5}
                    onEdit={({ original }) => {
                        setCurrent(original)
                        openModal()
                    }}
                    onDelete={({ original }) => {
                        setCurrent(original)
                        openDelete()
                    }}
                />
            </div>
        </div>
    )
}

export default HrAccordion
