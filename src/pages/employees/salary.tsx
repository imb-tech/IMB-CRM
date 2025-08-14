import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import Modal from "@/components/custom/modal"
import { SALARIES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"
import { useEmployeeSalaryCols } from "./salary-columns"
import AttachSalary from "./attach-salary"
import { Badge } from "@/components/ui/badge"

const EmployeeSalaries = () => {
    const { role, ...params } = useSearch({ from: "/_main/employees" })

    const { data, isFetching } = useGet<ListResp<EmployeeSalary>>(SALARIES, {
        params: { role: role === "all" ? undefined : role, ...params },
    })

    const columns = useEmployeeSalaryCols()

    return (
        <div className="w-full">
            <Card className="rounded-lg">
                <CardContent>
                    <div className="flex items-center gap-3 mb-3">
                        <h1 className="text-xl font-medium ">
                            {"Moashlar ro'yxati"}
                        </h1>
                        <Badge className="text-sm">1</Badge>
                    </div>
                    <DataTable
                        columns={
                            role !== "all"
                                ? columns.filter((r) => r.header !== "Role")
                                : columns
                        }
                        data={data?.results}
                        loading={isFetching}
                        viewAll
                        numeration
                    />
                </CardContent>
            </Card>
            <Modal
                size="max-w-lg"
                modalKey={`${SALARIES}-add`}
                title={`Maosh belgilash`}
            >
                <AttachSalary />
            </Modal>
        </div>
    )
}

export default EmployeeSalaries
