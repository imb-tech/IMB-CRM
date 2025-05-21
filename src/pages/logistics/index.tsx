import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/datatable"
import ParamInput from "@/components/as-params/input"
import { useLogisticsColumns } from "./columns"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import { useSearch } from "@tanstack/react-router"
import { USERS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useTypedStoreData } from "@/hooks/useStoreData"

export const LogisticsPages = () => {
    const { openModal: openCustomerAdd } = useModal("logis-modal")
    const { openModal: openModalDelete } = useModal("logis-delete")
    const { storeData, setStoreData, clearUserData } = useTypedStoreData<LogisticsType>()
    const search = useSearch({ from: "/_main/logistics" })
    const { data, isLoading } = useGet<LogisticsTypeResults>(USERS, {
        params: { ...search, role: 2 },
    })

    const handleDelete = (item: LogisticsType) => {
        clearUserData()
        openModalDelete()
        setStoreData(item)
    }

    const handleUpdate = (item: LogisticsType) => {
        clearUserData()
        setStoreData(item)
        openCustomerAdd()
    }
    const handleAdd = () => {
        clearUserData()
        openCustomerAdd()
    }

    const columns = useLogisticsColumns()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent>
                    <div className="flex  justify-between items-center gap-3 mb-4">
                        <h1 className="text-xl">Logistlar ro'yxati</h1>
                        <div className="flex items-center gap-3">
                            <ParamInput
                                fullWidth
                                placeholder="Logist qidirish"
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
                modalKey="logis-delete"
                id={storeData?.id}
                path={USERS}
            />
        </div>
    )
}
