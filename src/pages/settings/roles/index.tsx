import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useRolesCols } from "./columns"
import Modal from "@/components/custom/modal"
import RoleCreate from "./create"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { useState } from "react"
import { ROLE } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import SettingsHeader from "../settings-header"

const RolesMain = () => {
    const { openModal: openModalRole } = useModal(`${ROLE}-add`)
    const { openModal: openModalDelete } = useModal(`${ROLE}-delete`)
    const [current, setCurrent] = useState<Role | null>(null)

    const params = useSearch({ from: "/_main/settings/_main/roles" })
    const { data, isFetching } = useGet<ListResp<Role>>(ROLE, {
        params,
    })

    const handleItemAdd = () => {
        setCurrent(null)
        openModalRole()
    }
    const handleItemEdit = (item: Role) => {
        if (item.id) {
            setCurrent(item)
            openModalRole()
        }
    }
    const handleItemDelete = (item: Role) => {
        if (item.id) {
            setCurrent(item)
            openModalDelete()
        }
    }

    const columns = useRolesCols()
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
                        data={data?.results}
                        loading={isFetching}
                    />
                </CardContent>
            </Card>
            <Modal
                modalKey={`${ROLE}-add`}
                title={`Role ${current?.id ? "tahrirlash" : "qo'shish"}`}
            >
                <RoleCreate item={current} />
            </Modal>
            <DeleteModal
                modalKey={`${ROLE}-delete`}
                id={current?.id}
                path={ROLE}
            />
        </div>
    )
}

export default RolesMain
