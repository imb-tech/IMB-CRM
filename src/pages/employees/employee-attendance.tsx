import { Card, CardContent } from "@/components/ui/card"
import Modal from "@/components/custom/modal"
import EmployeeCreate from "./create"
import { useState } from "react"
import DeleteModal from "@/components/custom/delete-modal"
import { EMPLOYEE, OPTION_ROLES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"
import HrAccordion from "./hr-accordion"

const EmployeesAttendance = () => {
    const [current, setCurrent] = useState<Employee | null>(null)
    const { role, ...params } = useSearch({ from: "/_main/employees" })

    const { data, isFetching } = useGet<ListResp<Employee>>(EMPLOYEE, {
        params: { role: role === "all" ? undefined : role, ...params },
    })

    return (
        <div className="w-full">
            <Card className="rounded-lg">
                <CardContent>
                    {/* <Button onClick={openModal}>Yaratish</Button> */}
                    <HrAccordion loading={isFetching} users={data?.results} />
                </CardContent>
            </Card>
            <Modal
                size="max-w-lg"
                modalKey={`${EMPLOYEE}-add`}
                title={`Hodim ${current?.id ? "tahrirlash" : "yaratish"}`}
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

export default EmployeesAttendance
