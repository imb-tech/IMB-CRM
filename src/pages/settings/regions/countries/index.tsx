import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/datatable"
import ParamInput from "@/components/as-params/input"
import { useRegionsColumns } from "./columns"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"
import { COUNTRY } from "@/constants/api-endpoints"
import { useTypedStoreData } from "@/hooks/useStoreData"

export const CountriesPages = () => {
    const { openModal: openModalAdd } = useModal("countries-modal")
    const { openModal: openModalDelete } = useModal("countries-delete")
    const { storeData, setStoreData, clearUserData } = useTypedStoreData<CountriesType>()
    const columns = useRegionsColumns()

    const search:SearchParamsCountries = useSearch({ from: "/_main/settings" })
    const { data, isLoading } = useGet<CountriesResults>(COUNTRY, {
        params: {
            search: search.countries_search,
            page_size: search.countries_page_size,
            page: search.countries_page,
        },
    })

    const handleDelete = (item: CountriesType) => {
        clearUserData()
        openModalDelete()
        setStoreData(item)
    }

    const handleUpdate = (item: CountriesType) => {
        clearUserData()
        setStoreData(item)
        openModalAdd()
    }

    const handleAdd = () => {
        clearUserData()
        openModalAdd()
    }

    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                    <div className="flex  justify-between items-center gap-3 mb-4">
                        <h1 className="text-xl">Davlatlar</h1>
                        <div className="flex items-center gap-3">
                            <ParamInput
                                fullWidth
                                placeholder="Qidirish"
                                searchKey="countries_search"
                                pageKey="countries_page"
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
                            pageSizeParamName: "countries_page_size",
                            paramName: "countries_page",
                        }}
                    />
                </CardContent>
            </Card>
            <DeleteModal
                modalKey="countries-delete"
                id={storeData?.id}
                path={COUNTRY}
            />
        </div>
    )
}
