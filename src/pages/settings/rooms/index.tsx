import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useRoomsCols } from "./columns"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { ROOM } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import ParamPagination from "@/components/as-params/pagination"
import SettingsHeader from "../settings-header"
import { useStore } from "@/hooks/use-store"

const RoomsMain = () => {
    const { openModal: openModalRoom } = useModal(`${ROOM}-add`)
    const { openModal: openModalDelete } = useModal(`${ROOM}-delete`)
    const { store, setStore, remove } = useStore<Room | null>("rooms")

    const params = useSearch({ from: "/_main/groups/" })
    const { data, isFetching } = useGet<ListResp<Room>>(ROOM, { params })

    const handleItemAdd = () => {
        remove()
        openModalRoom()
    }
    const handleItemEdit = (item: Room) => {
        if (item.id) {
            setStore(item)
            openModalRoom()
        }
    }
    const handleItemDelete = (item: Room) => {
        if (item.id) {
            setStore(item)
            openModalDelete()
        }
    }

    const columns = useRoomsCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <SettingsHeader
                        dataCount={data?.count}
                        handleAdd={handleItemAdd}
                        pageTitle="Xonalar"
                    />
                    <DataTable
                        onDelete={(row) => handleItemDelete(row.original)}
                        onEdit={(row) => handleItemEdit(row.original)}
                        columns={columns}
                        data={data?.results}
                        loading={isFetching}
                        numeration
                        viewAll
                    />
                    <ParamPagination totalPages={data?.total_pages} />
                </CardContent>
            </Card>
        
            <DeleteModal
                modalKey={`${ROOM}-delete`}
                id={store?.id}
                path={ROOM}
            />
        </div>
    )
}

export default RoomsMain

const data: Room[] = []
