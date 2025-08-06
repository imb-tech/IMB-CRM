import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useBranchesCols } from "./columns"
import Modal from "@/components/custom/modal"
import BranchesCreate from "./create"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { useState } from "react"
import { BRANCH } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import ParamPagination from "@/components/as-params/pagination"
import { useSearch } from "@tanstack/react-router"
import SettingsHeader from "../settings-header"

const BranchesMain = () => {
    const { openModal: openModalBranch } = useModal(`${BRANCH}-add`)
    const { openModal: openModalDelete } = useModal(`${BRANCH}-delete`)
    const [current, setCurrent] = useState<Branch | null>(null)
    const params = useSearch({ from: "/_main/settings/_main/branches" })
    const { data, isFetching } = useGet<ListResp<Branch>>(BRANCH, { params })

    const handleItemAdd = () => {
        setCurrent(null)
        openModalBranch()
    }
    const handleItemEdit = (item: Branch) => {
        if (item.id) {
            setCurrent(item)
            openModalBranch()
        }
    }
    const handleItemDelete = (item: Branch) => {
        if (item.id) {
            setCurrent(item)
            openModalDelete()
        }
    }
    const columns = useBranchesCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <SettingsHeader
                        dataCount={data?.count}
                        handleAdd={handleItemAdd}
                    />
                    <DataTable
                        numeration
                        onEdit={(row) => handleItemEdit(row.original)}
                        onDelete={(row) => handleItemDelete(row.original)}
                        columns={columns}
                        data={data?.results ?? []}
                        viewAll
                        loading={isFetching}
                    />
                    <ParamPagination
                        totalPages={data?.total_pages}
                        changePageSize={false}
                    />
                </CardContent>
            </Card>
            <Modal
                modalKey={`${BRANCH}-add`}
                title={`Filial ${current?.id ? "tahrirlash" : "qo'shish"}`}
            >
                <BranchesCreate item={current} />
            </Modal>
            <DeleteModal
                modalKey={`${BRANCH}-delete`}
                id={current?.id}
                path={BRANCH}
            />
        </div>
    )
}

export default BranchesMain
