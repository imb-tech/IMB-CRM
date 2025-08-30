import { DataTable } from "@/components/ui/datatable"
import { useLeadArchiveCols } from "./cols"
import ParamInput from "@/components/as-params/input"
import { useGet } from "@/hooks/useGet"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import LeadsDepartmentFilter from "@/pages/reports/student-payment/leads-department-filter"
import { ParamCombobox } from "@/components/as-params/combobox"

const options = [
    {
        id: "success",
        name: "Muvaffaqiyatli",
    },
    {
        id: "loosed",
        name: "O'chirilgan",
    },
]

export default function LeadsArchive() {
    const params = useSearch({ strict: false })
    const navigate = useNavigate()

    const { data: users, isFetching } = useGet<Lead[]>("leads/crud", {
        params: { is_active: "false", ...params },
    })

    function handClick(item: Lead) {
        navigate({
            to: "/leads/varonka/$id/user/$user",
            params: {
                id: item.pipeline_id.toString(),
                user: item.id.toString(),
            },
        })
    }

    return (
        <Card>
            <CardContent>
                <DataTable
                    numeration
                    loading={isFetching}
                    columns={useLeadArchiveCols()}
                    data={users ?? []}
                    wrapperClassName="w-full"
                    onRowClick={handClick}
                    head={
                        <div className="flex mb-3  justify-between items-center gap-3 ">
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl">Arxivlar ro'yxati</h1>
                                <Badge className="text-sm">
                                    {users?.length}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-3">
                                <div>
                                    <ParamInput />
                                </div>
                                <ParamCombobox
                                    dontAllowClear
                                    isSearch={false}
                                    options={options}
                                    labelKey="name"
                                    valueKey="id"
                                    paramName="condition"
                                    label="Holatni tanlang"
                                />
                                <LeadsDepartmentFilter />
                                <Button
                                    onClick={() =>
                                        navigate({
                                            to: "/leads/forms/create",
                                            search: {
                                                pipeline: params.pipeline,
                                            },
                                        })
                                    }
                                    className="sm:w-max w-full"
                                >
                                    <Plus size={18} />
                                    {"Yangi yaratish"}
                                </Button>
                            </div>
                        </div>
                    }
                />
            </CardContent>
        </Card>
    )
}
