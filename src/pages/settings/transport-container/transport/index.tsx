import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/datatable"
import ParamInput from "@/components/as-params/input"
import { useTransportColumns } from "./columns"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import { TRANSPORT } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"
import { useTypedStoreData } from "@/hooks/useStoreData"

export const TransportPages = () => {
    const { openModal: openModalAdd } = useModal("transport-modal")
    const { openModal: openModalDelete } = useModal("transport-delete")
    const { storeData, setStoreData, clearUserData } = useTypedStoreData<TransportType>()
    const search: SearchParamsTransport = useSearch({ from: "/_main/settings" })
    const { data, isLoading } = useGet<TransportResults>(TRANSPORT, {
        params: {
            search: search.transport_search,
            page_size: search.transport_page_size,
            page: search.transport_page,
        },
    })

    const handleDelete = (item: TransportType) => {
        clearUserData()
        openModalDelete()
        setStoreData(item)
    }

    const handleUpdate = (item: TransportType) => {
        clearUserData()
        setStoreData(item)
        openModalAdd()
    }

    const handleAdd = () => {
        clearUserData()
        openModalAdd()
    }

    const columns = useTransportColumns()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                    <div className="flex  justify-between items-center gap-3 mb-4">
                        <h1 className="text-xl">Transport</h1>
                        <div className="flex items-center gap-3">
                            <ParamInput
                                fullWidth
                                placeholder="Qidirish"
                                searchKey="transport_search"
                                pageKey="transport_page"
                            />
                            <Button onClick={handleAdd}>
                                <Plus className="h-4 w-4" />
                                Qo'shish
                            </Button>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={data?.results}
                        onDelete={(item) => handleDelete(item.original)}
                        onEdit={(item) => handleUpdate(item.original)}
                        loading={isLoading}
                        paginationProps={{
                            pageSizeParamName: "transport_page_size",
                            paramName: "transport_page",
                        }}
                    />
                </CardContent>
            </Card>
            <DeleteModal
                modalKey="transport-delete"
                id={storeData?.id}
                path={TRANSPORT}
            />
        </div>
    )
}
