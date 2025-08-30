import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useHolidaysCols } from "./columns"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { HOLIDAY } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import SettingsHeader from "../settings-header"
import { useStore } from "@/hooks/use-store"

const HolidaysMain = () => {
    const { openModal: openModalHoliday } = useModal(`${HOLIDAY}-add`)
    const { openModal: openModalDelete } = useModal(`${HOLIDAY}-delete`)
    const { store, setStore, remove } = useStore<Holiday | null>("holiday")

    const params = useSearch({ from: "/_main/settings/_main/holidays" })
    const { data, isFetching } = useGet<ListResp<Holiday>>(HOLIDAY, { params })

    const handleItemAdd = () => {
        remove()
        openModalHoliday()
    }
    const handleItemEdit = (item: Holiday) => {
        if (item.id) {
            setStore(item)
            openModalHoliday()
        }
    }
    const handleItemDelete = (item: Holiday) => {
        if (item.id) {
            setStore(item)
            openModalDelete()
        }
    }

    const columns = useHolidaysCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <SettingsHeader
                        dataCount={data?.count}
                        handleAdd={handleItemAdd}
                    />
                    <DataTable
                        onDelete={(row) => handleItemDelete(row.original)}
                        onEdit={(row) => handleItemEdit(row.original)}
                        columns={columns}
                        loading={isFetching}
                        data={data?.results}
                        viewAll
                        numeration
                    />
                </CardContent>
            </Card>
            <DeleteModal
                modalKey={`${HOLIDAY}-delete`}
                id={store?.id}
                path={HOLIDAY}
            />
        </div>
    )
}

export default HolidaysMain

