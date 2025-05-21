import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/datatable"
import ParamInput from "@/components/as-params/input"
import { useOffersColumns } from "./columns"
import { useParams } from "@tanstack/react-router"
import { OFFERS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"

export const OffersPages = () => {
    const id = useParams({ from: "/_main/_orders/order/$id" })
    const { data, isLoading } = useGet<OffersTypeResults>(
        `${OFFERS}/${id?.id}`,
        {
            options: { enabled: !!id.id },
        },
    )

    const columns = useOffersColumns()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                    <div className="flex  justify-between items-center gap-3 mb-4">
                        <h1 className="text-xl">Takliflar ro'yxati</h1>
                        <div className="flex items-center gap-3">
                            <ParamInput
                                fullWidth
                                placeholder="Logist qidirish"
                                className=""
                            />
                            <Button>
                                <Plus className="h-4 w-4" />
                                Qayta taklif yuborish
                            </Button>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={data?.results}
                        onEdit={(item) => {}}
                        loading={isLoading}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
