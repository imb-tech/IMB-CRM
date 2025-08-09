import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useEmployeeCols } from "./columns"
import Modal from "@/components/custom/modal"
import EmployeeCreate from "./create"
import { useModal } from "@/hooks/useModal"
import { useState } from "react"
import DeleteModal from "@/components/custom/delete-modal"
import { EMPLOYEE, OPTION_ROLES } from "@/constants/api-endpoints"
import EmployeesHeader from "./employees-header"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"

const EmployeesMain = () => {
    const { openModal: openModalEmployee } = useModal(`${EMPLOYEE}-add`)
    const { openModal: openModalDelete } = useModal(`${EMPLOYEE}-delete`)
    const [current, setCurrent] = useState<Employee | null>(null)
    const { role, ...params } = useSearch({ from: "/_main/employees" })

    const { data, isFetching } = useGet<ListResp<Employee>>(EMPLOYEE, {
        params: { role: role === "all" ? undefined : role, ...params },
    })

    const handleItemEdit = (item: Employee) => {
        if (item.id) {
            setCurrent(item)
            openModalEmployee()
        }
    }
    const handleItemDelete = (item: Employee) => {
        if (item.id) {
            setCurrent(item)
            openModalDelete()
        }
    }
    const columns = useEmployeeCols()

    return (
        <div className="w-full">
            <div className="mb-3 md:mb-1">
                <EmployeesHeader />
            </div>
            <Card className="rounded-lg">
                <CardContent>
                    <DataTable
                        onEdit={(row) => handleItemEdit(row.original)}
                        onDelete={(row) => handleItemDelete(row.original)}
                        columns={
                            role !== "all" ?
                                columns.filter((r) => r.header !== "Role")
                            :   columns
                        }
                        data={data?.results}
                        loading={isFetching}
                        selecteds_row
                        viewAll
                        numeration
                    />
                </CardContent>
            </Card>
            <Modal
                size="max-w-lg"
                modalKey={`${EMPLOYEE}-add`}
                title={`Hodim ${current?.id ? "tahrirlash" : "qo'shish"}`}
                onClose={() => setCurrent(null)}
            >
                <EmployeeCreate item={current} />
            </Modal>
            <DeleteModal
                modalKey={`${EMPLOYEE}-delete`}
                id={current?.id}
                refetchKeys={[OPTION_ROLES]}
                path={EMPLOYEE}
            />
        </div>
    )
}

export default EmployeesMain
