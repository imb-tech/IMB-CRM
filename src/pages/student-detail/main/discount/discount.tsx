import { DataTable } from "@/components/ui/datatable"
import { useColumns } from "./columns"
import { useGet } from "@/hooks/useGet"
import { GROUP_STUDENTS_DISCOUNTS } from "@/constants/api-endpoints"
import { Badge } from "@/components/ui/badge"
import { useParams, useSearch } from "@tanstack/react-router"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { formatMoney } from "@/lib/format-money"
import { useStore } from "@/hooks/use-store"
import Modal from "@/components/custom/modal"
import DiscountStudentCreate from "./create"

const StudentDiscountMain = () => {
    const { id } = useParams({ from: "/_main/students/$id/_main/discount" })
    const search = useSearch({ from: "/_main/students/$id/_main/discount" })
    const { store, setStore, remove } = useStore<DiscountStudent | null>(
        "discount",
    )
    const { openModal } = useModal("discount-add")
    const { openModal: openDelete } = useModal("discount-delete")

    const { data, isFetching } = useGet<ListResp<DiscountStudent>>(
        GROUP_STUDENTS_DISCOUNTS,
        {
            params: { ...search, student: id },
        },
    )

    const handleAddDiscount = useCallback(() => {
        remove()
        openModal()
    }, [openModal])

    const handleUpdate = useCallback(
        (item: DiscountStudent) => {
            if (item?.id) {
                setStore(item)
                openModal()
            }
        },
        [openModal, setStore],
    )

    const handleDelete = useCallback(
        (item: DiscountStudent) => {
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
                    <h1 className="text-xl font-medium ">
                        {"Chegirmalar ro'yxati"}
                    </h1>
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
                    <span className="sm:block hidden">Chegirma qo'shish</span>
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

            <Modal
                modalKey="discount-add"
                title={`Chegirma ${store?.id ? "tahrirlash" : "qo'shish"}`}
            >
                <DiscountStudentCreate id={id} />
            </Modal>

            <DeleteModal
                modalKey="discount-delete"
                id={store?.id}
                path={GROUP_STUDENTS_DISCOUNTS}
            />
        </div>
    )
}

export default StudentDiscountMain
