import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/datatable"
import ParamInput from "@/components/as-params/input"
import { useContainerColumns } from "./columns"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import { CONTAINER_TYPE } from "@/constants/api-endpoints"
import { useTypedStoreData } from "@/hooks/useStoreData"

export const ContainerPages = () => {
    const { openModal: openModalAdd } = useModal("container-modal")
    const { openModal: openModalDelete } = useModal("container-delete")
    const { storeData, setStoreData, clearUserData } = useTypedStoreData<ContainerType>()
    const search:SearchParamsContainer = useSearch({ from: "/_main/settings" })
    const { data, isLoading } = useGet<ContainerResults>(CONTAINER_TYPE, {
        params: {
            search: search.container_search,
            page_size: search.container_page_size,
            page: search.container_page,
        },
    })

    const handleDelete = (item: ContainerType) => {
        clearUserData()
        openModalDelete()
        setStoreData(item)
    }

    const handleUpdate = (item: ContainerType) => {
        clearUserData()
        setStoreData(item)
        openModalAdd()
    }

    const handleAdd = () => {
        clearUserData()
        openModalAdd()
    }

    const columns = useContainerColumns()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                    <div className="flex  justify-between items-center gap-3 mb-4">
                        <h1 className="text-xl">Konteyner turlari</h1>
                        <div className="flex items-center gap-3">
                            <ParamInput
                                fullWidth
                                placeholder="Qidirish"
                                searchKey="container_search"
                                pageKey="container_page"
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
                            pageSizeParamName: "container_page_size",
                            paramName: "container_page",
                        }}
                    />
                </CardContent>
            </Card>
            <DeleteModal
                modalKey="container-delete"
                id={storeData?.id}
                path={CONTAINER_TYPE}
            />
        </div>
    )
}
