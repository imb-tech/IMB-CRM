import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useLogsColumns } from "./columns"
import { useParams } from "@tanstack/react-router"
import { CONTAINERS_LOGS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"

export const LogsPages = () => {
    const id = useParams({ from: "/_main/_orders/order/$id" })
    const { data, isLoading } = useGet<Logs[]>(
        `${CONTAINERS_LOGS}/${id?.id}`,
        {
            options: { enabled: !!id.id },
        },
    )

    const columns = useLogsColumns()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                        <h1 className="text-xl mb-4">O'zgarishlar tarixi</h1>
                    <DataTable
                        columns={columns}
                        data={data}
                        loading={isLoading}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
