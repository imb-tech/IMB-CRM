import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { usePaymentTypeCols } from "./columns"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { PAYMENT_TYPE } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import ParamPagination from "@/components/as-params/pagination"
import SettingsHeader from "../settings-header"
import { useStore } from "@/hooks/use-store"

const PaymentTypeMain = () => {
    const { openModal: openModalPaymentType } = useModal(`${PAYMENT_TYPE}-add`)
    const { openModal: openModalDelete } = useModal(`${PAYMENT_TYPE}-delete`)
    const { store, setStore, remove } = useStore<PaymentType | null>("payment-type")

    const params = useSearch({ from: "/_main/settings/_main/payment-type" })
    const { data, isFetching } = useGet<ListResp<PaymentType>>(PAYMENT_TYPE, {
        params,
    })

    const handleItemAdd = () => {
        remove()
        openModalPaymentType()
    }
    const handleItemEdit = (item: PaymentType) => {
        if (item.id) {
            setStore(item)
            openModalPaymentType()
        }
    }
    const handleItemDelete = (item: PaymentType) => {
        if (item.id) {
            setStore(item)
            openModalDelete()
        }
    }

    const columns = usePaymentTypeCols()
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
                        viewAll
                        loading={isFetching}
                        numeration
                    />
                    <ParamPagination totalPages={data?.total_pages} />
                </CardContent>
            </Card>
            <DeleteModal
                modalKey={`${PAYMENT_TYPE}-delete`}
                id={store?.id}
                path={PAYMENT_TYPE}
            />
        </div>
    )
}

export default PaymentTypeMain

