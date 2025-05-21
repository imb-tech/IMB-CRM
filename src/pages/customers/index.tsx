import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { useCustomersColumns } from "./columns"
import { DataTable } from "@/components/ui/datatable"
import ParamInput from "@/components/as-params/input"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import { useGet } from "@/hooks/useGet"
import { USERS } from "@/constants/api-endpoints"
import {  useSearch } from "@tanstack/react-router"
import { useTypedStoreData } from "@/hooks/useStoreData"

export const CustomersPages = () => {
    const { openModal: openCustomerAdd } = useModal("customer-modal")
    const { openModal: openModalDelete } = useModal("customer-delete")
    const { storeData, setStoreData, clearUserData } = useTypedStoreData<CustomersType>()
    const search = useSearch({ from: "/_main/customers" })
    const { data, isLoading } = useGet<CustomersTypeResults>(USERS, {
        params: { ...search, role: 3 },
    })

    const handleDelete = (item: CustomersType) => {
        clearUserData()
        openModalDelete()
        setStoreData(item)
    }

    const handleUpdate = (item: CustomersType) => {
        clearUserData()
        setStoreData(item)
        openCustomerAdd()
    }

    const handleAdd = () => {
        clearUserData()
        openCustomerAdd()
    }

    const columns = useCustomersColumns()

    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                    <div className="flex  justify-between items-center gap-3 mb-4">
                        <h1 className="text-xl">Mijozlar ro'yxati</h1>
                        <div className="flex items-center gap-3">
                            <ParamInput
                                fullWidth
                                placeholder="Mijoz qidirish"
                                className=""
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
                    />
                </CardContent>
            </Card>
            <DeleteModal
                modalKey="customer-delete"
                id={storeData?.id}
                path={USERS}
            />
        </div>
    )
}
