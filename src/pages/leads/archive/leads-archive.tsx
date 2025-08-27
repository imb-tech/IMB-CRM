import { DataTable } from "@/components/ui/datatable"
import LeadsTab from "../leads-tab"
import { useLeadArchiveCols } from "./cols"
import ParamInput from "@/components/as-params/input"
import { useGet } from "@/hooks/useGet"
import { useNavigate, useSearch } from "@tanstack/react-router"
import LeadDealSelector from "../lead-deal-selector"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function LeadsArchive() {
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
            <div className="flex gap-3  sm:flex-row flex-col items-center sm:justify-between">
                <LeadsTab />

                <div className="flex gap-2 items-center sm:w-max w-full">
                    <ParamInput />
                    <LeadDealSelector />
                </div>
            </div>

            <Card>
                <CardContent>
                    <DataTable
                        loading={isFetching}
                        columns={useLeadArchiveCols()}
                        data={users ?? []}
                        wrapperClassName="w-full"
                        onRowClick={handClick}
                        head={
                            <div className="flex mb-3  justify-between items-center gap-3 ">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-xl">
                                        Arxivlar ro'yxati
                                    </h1>
                                    <Badge className="text-sm">
                                        {users?.length}
                                    </Badge>
                                </div>
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
                        }
                    />
                </CardContent>
            </Card>
        </div>
    )
}
