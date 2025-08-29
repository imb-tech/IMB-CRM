import { DataTable } from "@/components/ui/datatable"
import { useColumns } from "./columns"
import { useGet } from "@/hooks/useGet"
import { STUDENT_PARENTS } from "@/constants/api-endpoints"
import { Badge } from "@/components/ui/badge"
import { useParams, useSearch } from "@tanstack/react-router"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { formatMoney } from "@/lib/format-money"
import { useStore } from "@/hooks/use-store"

const StudentParentsMain = () => {
    const { id } = useParams({ from: "/_main/students/$id/_main/parents" })
    const search = useSearch({ from: "/_main/students/$id/_main/parents" })
    const {
        store: parent,
        remove,
        setStore,
    } = useStore<StudentParents | null>("parent")
    const { openModal } = useModal("parents-add")
    const { openModal: openDelete } = useModal("parents-delete")

    const { data, isFetching } = useGet<ListResp<StudentParents>>(
        STUDENT_PARENTS,
        {
            params: { ...search, student: id },
            options: { enabled: !!id },
        },
    )

    const handleAddDiscount = useCallback(() => {
        remove()
        openModal()
    }, [openModal])

    const handleUpdate = useCallback(
        (item: StudentParents) => {
            if (item?.id) {
                setStore(item)
                openModal()
            }
        },
        [openModal, setStore],
    )

    const handleDelete = useCallback(
        (item: StudentParents) => {
            setStore(item)
            openDelete()
        },
        [openDelete],
    )

    const columns = useColumns()

    return (
        <div className="mt-1">
            <div className="flex  mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium ">{"Ota-Ona"}</h1>
                    <Badge className="text-sm">
                        {formatMoney(data?.count)}
                    </Badge>
                </div>
                <Button
                    type="button"
                    onClick={handleAddDiscount}
                    className="flex gap-1"
                >
                    <Plus className="w-5 h-5" />
                    <span className="sm:block hidden">Qo'shish</span>
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={data?.results}
                loading={isFetching}
                onEdit={(item) => handleUpdate(item.original)}
                onDelete={(item) => handleDelete(item.original)}
                numeration
                paginationProps={{ totalPages: data?.total_pages }}
            />
            <DeleteModal
                modalKey="parents-delete"
                id={parent?.id}
                path={STUDENT_PARENTS}
            />


        </div>
    )
}

export default StudentParentsMain
