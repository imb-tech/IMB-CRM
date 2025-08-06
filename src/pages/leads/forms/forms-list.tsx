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
import LeadsTab from "../leads-tab"

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
                params,
            },
        },
    )

    return (
        <div>
            <div className="flex justify-between mb-3">
                <LeadsTab />
                <Button onClick={() => navigate({ to: "/leads/forms/create" })}>
                    <Plus size={18} />
                    Yangi
                </Button>
            </div>

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
            />

            <DeleteModal
                id={item}
                path="leads/forms"
                refetchKey="leads/forms/list"
            />
        </div>
    )
}
