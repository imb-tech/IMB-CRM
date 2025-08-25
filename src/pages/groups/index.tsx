import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { Plus } from "lucide-react"
import { useGroupCols } from "./columns"
import { Badge } from "@/components/ui/badge"
import Modal from "@/components/custom/modal"
import DeleteModal from "@/components/custom/delete-modal"
import GroupCreate from "./create"
import { useModal } from "@/hooks/useModal"
import { useState } from "react"
import { GROUP } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import GroupFilter from "./group-filter"
import useHistoryNavigate from "@/hooks/use-history-navigate"

const GroupsMain = () => {
    const { openModal: openModalGroup } = useModal(`${GROUP}-add`)
    const { openModal: openModalDelete } = useModal(`${GROUP}-delete`)
    const [current, setCurrent] = useState<Group | null>(null)

    const params = useSearch({ from: "/_main/groups/" })

    const { data, isLoading } = useGet<ListResp<Group>>(GROUP, { params })

    const { push } = useHistoryNavigate()

    const handleItemAdd = () => {
        setCurrent(null)
        openModalGroup()
    }
    const handleItemEdit = (item: Group) => {
        if (item.id) {
            setCurrent(item)
            openModalGroup()
        }
    }
    const handleItemDelete = (item: Group) => {
        if (item.id) {
            setCurrent(item)
            openModalDelete()
        }
    }

    const columns = useGroupCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <div className="flex  justify-between items-center gap-3 ">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl">Guruhlar ro'yxati</h1>
                            <Badge className="text-sm">{data?.count}</Badge>
                        </div>
                        <Button onClick={handleItemAdd}>
                            <Plus className="h-4 w-4" />
                            Yaratish
                        </Button>
                    </div>
                    <GroupFilter />
                    <DataTable
                        onEdit={(row) => handleItemEdit(row.original)}
                        onDelete={(row) => handleItemDelete(row.original)}
                        columns={columns}
                        data={data?.results}
                        onRowClick={({ id }) => push(`/groups/${id}/students`)}
                        loading={isLoading}
                        viewAll
                        selecteds_row
                    />
                </CardContent>
            </Card>
            <Modal
                modalKey={`${GROUP}-add`}
                title={`Guruh ${current?.id ? "tahrirlash" : "yaratish"}`}
                size="max-w-4xl"
            >
                <GroupCreate item={current} />
            </Modal>
            <DeleteModal
                modalKey={`${GROUP}-delete`}
                id={current?.id}
                path={GROUP}
            />
        </div>
    )
}

export default GroupsMain
