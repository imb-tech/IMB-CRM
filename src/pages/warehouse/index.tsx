import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/datatable"
import ParamInput from "@/components/as-params/input"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import { useGet } from "@/hooks/useGet"
import { INVENTORY } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useWarehouseColumns } from "./columns"
import { useTypedStoreData } from "@/hooks/useStoreData"

export const WarehousePages = () => {
    const { openModal: openCustomerAdd } = useModal("warehouse-modal")
    const { storeData: storeDataCustomer } = useTypedStoreData<WarehouseType>()
    const { storeData: storeDataCustomerRow, setStoreData } =
        useTypedStoreData<WarehouseType[]>()

    const search = useSearch({ from: "/_main/warehouse" })
    const { data, isLoading } = useGet<WarehouseTypeResults>(INVENTORY, {
        params: search,
    })

    const handleAdd = () => {
        openCustomerAdd()
    }

    const columns = useWarehouseColumns()

    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                    <div className="flex  justify-between items-center gap-3 mb-4">
                        <h1 className="text-xl">Ombordagi yuklar</h1>
                        <div className="flex items-center gap-3">
                            <ParamInput
                                fullWidth
                                placeholder="Mijozlarni qidirish"
                                className=""
                            />
                            <Button
                                onClick={handleAdd}
                                disabled={!storeDataCustomerRow?.length}
                            >
                                <Plus className="h-4 w-4" />
                                Transport Qo'shish
                            </Button>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={data?.results}
                        loading={isLoading}
                        selecteds_count
                        selecteds_row
                        onSelectedRowsChange={(val) => setStoreData(val)}
                    />
                </CardContent>
            </Card>
            <DeleteModal
                modalKey="customer-delete"
                id={storeDataCustomer?.id}
                path="customer"
            />
        </div>
    )
}
