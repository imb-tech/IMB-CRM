import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useHolidaysCols } from "./columns"
import Modal from "@/components/custom/modal"
import HolidayCreate from "./create"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { useState } from "react"
import { HOLIDAY } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import SettingsHeader from "../settings-header"

const HolidaysMain = () => {
    const { openModal: openModalHoliday } = useModal(`${HOLIDAY}-add`)
    const { openModal: openModalDelete } = useModal(`${HOLIDAY}-delete`)
    const [current, setCurrent] = useState<Holiday | null>(null)

    const params = useSearch({ from: "/_main/settings/_main/holidays" })
    const { data, isFetching } = useGet<ListResp<Holiday>>(HOLIDAY, { params })

    const handleItemAdd = () => {
        setCurrent(null)
        openModalHoliday()
    }
    const handleItemEdit = (item: Holiday) => {
        if (item.id) {
            setCurrent(item)
            openModalHoliday()
        }
    }
    const handleItemDelete = (item: Holiday) => {
        if (item.id) {
            setCurrent(item)
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
                    />
                </CardContent>
            </Card>
            <Modal
                modalKey={`${HOLIDAY}-add`}
                title={`Ta'til kunini ${
                    current?.id ? "tahrirlash" : "yaratish"
                }`}
            >
                <HolidayCreate item={current} />
            </Modal>
            <DeleteModal
                modalKey={`${HOLIDAY}-delete`}
                id={current?.id}
                path={HOLIDAY}
            />
        </div>
    )
}

export default HolidaysMain

const data: Holiday[] = []
