import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/datatable"
import ParamInput from "@/components/as-params/input"
import { useCitiesColumns } from "./columns"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import { REGION } from "@/constants/api-endpoints"
import { useTypedStoreData } from "@/hooks/useStoreData"


export const CitiesPages = () => {
    const { openModal: openModalAdd } = useModal("cities-modal")
    const { openModal: openModalDelete } = useModal("cities-delete")
    const { storeData, setStoreData, clearUserData } = useTypedStoreData<CitiesType>()

    const search:SearchParamsCities = useSearch({ from: "/_main/settings" })
    const { data, isLoading } = useGet<CitiesResults>(REGION, {
          params: {
            search: search.cities_search,
            page_size: search.cities_page_size,
            page: search.cities_page,
        },
    })

    const handleDelete = (item: CitiesType) => {
        clearUserData()
        openModalDelete()
        setStoreData(item)
    }

    const handleUpdate = (item: CitiesType) => {
        clearUserData()
        setStoreData(item)
        openModalAdd()
    }

    const handleAdd = () => {
        clearUserData()
        openModalAdd()
    }

    const columns = useCitiesColumns()

    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                    <div className="flex  justify-between items-center gap-3 mb-4">
                        <h1 className="text-xl">Shaharlar</h1>
                        <div className="flex items-center gap-3">
                            <ParamInput
                                fullWidth
                                placeholder="Qidirish"
                                searchKey="cities_search"
                                pageKey="cities_page"
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
                            pageSizeParamName: "cities_page_size",
                            paramName: "cities_page",
                        }}
                    />
                </CardContent>
            </Card>
            <DeleteModal
                modalKey="cities-delete"
                id={storeData?.id}
                path={REGION}
            />
        </div>
    )
}
