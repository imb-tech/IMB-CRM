import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/datatable"
import ParamInput from "@/components/as-params/input"
import { useProductsColumns } from "./columns"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import { useGet } from "@/hooks/useGet"
import { PRODUCT } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useTypedStoreData } from "@/hooks/useStoreData"


export const ProductsPages = () => {
    const { openModal: openModalAdd } = useModal("product-modal")
    const { openModal: openModalDelete } = useModal("product-delete")
    const { storeData, setStoreData, clearUserData } = useTypedStoreData<ProductsType>()
    const search:SearchParamsProduct = useSearch({ from: "/_main/settings" })
    const { data, isLoading } = useGet<ProductResults>(PRODUCT, {
        params: {
            search: search.product_search,
            page_size: search.product_page_size,
            page: search.product_page,
        },
    })

    const handleDelete = (item: ProductsType) => {
        clearUserData()
        openModalDelete()
        setStoreData(item)
    }

    const handleUpdate = (item: ProductsType) => {
        clearUserData()
        setStoreData(item)
        openModalAdd()
    }

    const handleAdd = () => {
        clearUserData()
        openModalAdd()
    }

    const columns = useProductsColumns()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                    <div className="flex  justify-between items-center gap-3 mb-4">
                        <h1 className="text-xl">Mahsulotlar</h1>
                        <div className="flex items-center gap-3">
                            <ParamInput
                                fullWidth
                                placeholder="Qidirish"
                                searchKey="product_search"
                                pageKey="product_page"
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
                            pageSizeParamName: "product_page_size",
                            paramName: "product_page",
                        }}
                    />
                </CardContent>
            </Card>
            <DeleteModal
                modalKey="product-delete"
                id={storeData?.id}
                path={PRODUCT}
            />
        </div>
    )
}
