import { useGet } from "@/hooks/useGet"
import { DataTable } from "@/components/ui/datatable"
import { OPTION_ROLES } from "@/constants/api-endpoints"
import { useEmployeeCols } from "./columns"
import { Badge } from "@/components/ui/badge"
import EmployeesHeader from "./employees-header"

type Props = {
    loading?: boolean
    users?: Employee[]
}

function HrAccordion({ loading, users }: Props) {
    const { data } = useGet<RoleOption[]>(OPTION_ROLES)

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
                />
            </div>
        </div>
    )
}

export default HrAccordion
