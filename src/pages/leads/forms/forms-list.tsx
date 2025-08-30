import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/datatable"
import { useGet } from "@/hooks/useGet"
import { Plus } from "lucide-react"
import { useLeadFormCols } from "./form-cols"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { PAGE_SIZE_KEY } from "@/constants/default"
import { useState } from "react"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import LeadsDepartmentFilter from "@/pages/reports/student-payment/leads-department-filter"

export default function FormsList() {
    const params = useSearch({ strict: false })
    const [item, setItem] = useState<number>()
    const { openModal } = useModal("delete")
    const navigate = useNavigate()

    const { data, isFetching } = useGet<ListResp<LeadForm>>(
        "leads/forms/list",
        {
            params: {
                [PAGE_SIZE_KEY]: 25,
                pipeline: params?.pipeline,
            },
        },
    )

    return (
        <div>
            <Card>
                <CardContent>
                    <DataTable
                        loading={isFetching}
                        data={data?.results}
                        columns={useLeadFormCols()}
                        paginationProps={{
                            totalPages: data?.total_pages,
                        }}
                        onDelete={({ original }) => {
                            setItem(original.id)
                            openModal()
                        }}
                        onEdit={({ original }) => {
                            navigate({
                                to: "/leads/forms/edit/$id",
                                params: { id: original.id.toString() },
                            })
                        }}
                        onRowClick={({ uuid }) =>
                            navigate({
                                to: "/form/$id",
                                params: { id: uuid },
                            })
                        }
                        head={
                            <div className="flex mb-3  justify-between items-center gap-3 ">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-xl">
                                        Formalar ro'yxati
                                    </h1>
                                    <Badge className="text-sm">
                                        {data?.count}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-3">
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

            <DeleteModal
                id={item}
                path="leads/forms"
                refetchKey="leads/forms/list"
            />
        </div>
    )
}
