import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useRolesCols } from "./columns"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { ROLE } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import SettingsHeader from "../settings-header"
import { useStore } from "@/hooks/use-store"

const RolesMain = () => {
    const { openModal: openModalRole } = useModal(`${ROLE}-add`)
    const { openModal: openModalDelete } = useModal(`${ROLE}-delete`)
    const { store, setStore, remove } = useStore<Role | null>("roles")

    const params = useSearch({ from: "/_main/settings/_main/roles" })
    const { data, isFetching } = useGet<ListResp<Role>>(ROLE, {
        params,
    })

    const handleItemAdd = () => {
        remove()
        openModalRole()
    }
    const handleItemEdit = (item: Role) => {
        if (item.id) {
            setStore(item)
            openModalRole()
        }
    }
    const handleItemDelete = (item: Role) => {
        if (item.id) {
            setStore(item)
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
                        numeration
                        setRowClassName={(row) =>
                            row.editable
                                ? ""
                                : "last:!opacity-0 last:!pointer-events-none"
                        }
                    />
                </CardContent>
            </Card>
            <DeleteModal
                modalKey={`${ROLE}-delete`}
                id={store?.id}
                path={ROLE}
            />
        </div>
    )
}

export default RolesMain
