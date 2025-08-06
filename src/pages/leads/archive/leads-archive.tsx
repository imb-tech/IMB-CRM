import { DataTable } from "@/components/ui/datatable"
import LeadsTab from "../leads-tab"
import { useLeadArchiveCols } from "./cols"
import ParamInput from "@/components/as-params/input"
import useLeadPipeline from "../use-lead-pipeline"
import { ParamCombobox } from "@/components/as-params/combobox"
import { useGet } from "@/hooks/useGet"
import { useNavigate, useSearch } from "@tanstack/react-router"

export default function LeadsArchive() {
    const { data } = useLeadPipeline({ is_active: "all" })
    const params = useSearch({ strict: false })
    const navigate = useNavigate()

    const { data: users, isFetching } = useGet<Lead[]>("leads/crud", {
        params: { condition: "archived", ...params },
    })

    function handClick(item: Lead) {
        navigate({
            to: "/leads/$id/user/$user",
            params: {
                id: item.pipeline_id.toString(),
                user: item.id.toString(),
            },
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <LeadsTab />

                <div className="flex gap-2 items-center">
                    <ParamCombobox
                        className="min-w-[200px] hidden sm:flex"
                        paramName="pipeline"
                        label="Bo'lim"
                        options={data ?? []}
                        valueKey="id"
                        labelKey="name"
                    />
                    <ParamInput />
                </div>
            </div>

            <DataTable
                loading={isFetching}
                columns={useLeadArchiveCols()}
                data={users ?? []}
                wrapperClassName="w-full"
                onRowClick={handClick}
            />
        </div>
    )
}
