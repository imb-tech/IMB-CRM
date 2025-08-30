import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useBranchesCols } from "./columns"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { BRANCH } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import ParamPagination from "@/components/as-params/pagination"
import { useSearch } from "@tanstack/react-router"
import SettingsHeader from "../settings-header"
import { useStore } from "@/hooks/use-store"

const BranchesMain = () => {
    const { openModal: openModalBranch } = useModal(`${BRANCH}-add`)
    const { openModal: openModalDelete } = useModal(`${BRANCH}-delete`)
    const { store, setStore, remove } = useStore<Branch | null>("branch")
    const params = useSearch({ from: "/_main/settings/_main/branches" })
    const { data, isFetching } = useGet<ListResp<Branch>>(BRANCH, { params })

    const handleItemAdd = () => {
        remove()
        openModalBranch()
    }
    const handleItemEdit = (item: Branch) => {
        if (item.id) {
            setStore(item)
            openModalBranch()
        }
    }
    const handleItemDelete = (item: Branch) => {
        if (item.id) {
            setStore(item)
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
            
            <DeleteModal
                modalKey={`${BRANCH}-delete`}
                id={store?.id}
                path={BRANCH}
            />
        </div>
    )
}

export default BranchesMain
