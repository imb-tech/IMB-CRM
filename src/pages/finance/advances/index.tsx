import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/datatable"
import ParamDateRange from "@/components/as-params/date-picker-range"
import { Card, CardContent } from "@/components/ui/card"
import { useAdvancesCols } from "./columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useGet } from "@/hooks/useGet"
import { FINANCE_ADVANCE } from "@/constants/api-endpoints"
import Modal from "@/components/custom/modal"
import AdvanceCreateForm from "./create-form"
import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import { useSearch } from "@tanstack/react-router"
import { formatMoney } from "@/lib/format-money"

function FinanceAdvanceMain() {
    const search = useSearch({ from: "/_main/finance/advances" })
    const { store, setStore, remove } = useStore<Advance>("advance-data")
    const { openModal } = useModal("advances-modal")
    const { openModal: openModalDelete } = useModal(`${FINANCE_ADVANCE}-delete`)
    const { data } = useGet<ListResp<Advance>>(FINANCE_ADVANCE, {
        params: search,
    })

    const handleAdd = () => {
        remove()
        openModal()
    }

    const handleUpdate = (item: Advance) => {
        setStore(item)
        openModal()
    }

    const handleItemDelete = (item: Advance) => {
        if (item.id) {
            setStore(item)
            openModalDelete()
        }
    }

    const columns = useAdvancesCols()

    return (
        <Card>
            <CardContent className="space-y-4">
                <DataTable
                    columns={columns}
                    data={data?.results || []}
                    numeration
                    onEdit={(row) => handleUpdate(row.original)}
                    onDelete={(row) => handleItemDelete(row.original)}
                    head={
                        <div className="flex mb-3  justify-between items-center gap-3 ">
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl">{`Avanslar ro'yxati`}</h1>
                                <Badge className="text-sm">{formatMoney(data?.count)}</Badge>
                            </div>
                            <div className="flex items-center gap-3">
                                <ParamDateRange
                                    from="start_date"
                                    to="end_date"
                                />
                                <Button type="button" onClick={handleAdd}>
                                    <Plus size={18} /> Avans berish
                                </Button>
                            </div>
                        </div>
                    }
                    paginationProps={{
                        totalPages: data?.total_pages,
                    }}
                />
            </CardContent>

            <Modal
                title={`Avans ${store?.id ? "tahrirlash" : "berish"}`}
                modalKey="advances-modal"
            >
                <AdvanceCreateForm />
            </Modal>

            <DeleteModal
                modalKey={`${FINANCE_ADVANCE}-delete`}
                id={store?.id}
                path={FINANCE_ADVANCE}
            />
        </Card>
    )
}

export default FinanceAdvanceMain
