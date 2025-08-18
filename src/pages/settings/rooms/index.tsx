import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useRoomsCols } from "./columns"
import DeleteModal from "@/components/custom/delete-modal"
import RoomCreate from "./create"
import Modal from "@/components/custom/modal"
import { useModal } from "@/hooks/useModal"
import { useState } from "react"
import { ROOM } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import ParamPagination from "@/components/as-params/pagination"
import SettingsHeader from "../settings-header"

const RoomsMain = () => {
    const { openModal: openModalRoom } = useModal(`${ROOM}-add`)
    const { openModal: openModalDelete } = useModal(`${ROOM}-delete`)
    const [current, setCurrent] = useState<Room | null>(null)

    const params = useSearch({ from: "/_main/groups/" })
    const { data, isFetching } = useGet<ListResp<Room>>(ROOM, { params })

    const handleItemAdd = () => {
        setCurrent(null)
        openModalRoom()
    }
    const handleItemEdit = (item: Room) => {
        if (item.id) {
            setCurrent(item)
            openModalRoom()
        }
    }
    const handleItemDelete = (item: Room) => {
        if (item.id) {
            setCurrent(item)
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
            <Modal
                modalKey={`${ROOM}-add`}
                title={`Xona ${current?.id ? "tahrirlash" : "yaratish"}`}
            >
                <RoomCreate item={current} />
            </Modal>
            <DeleteModal
                modalKey={`${ROOM}-delete`}
                id={current?.id}
                path={ROOM}
            />
        </div>
    )
}

export default RoomsMain

const data: Room[] = []
