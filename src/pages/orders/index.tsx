import { useOrderColumns } from "./columns"
import { DataTable } from "@/components/ui/datatable"
import ParamTabs from "@/components/as-params/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import { CONTAINERS } from "@/constants/api-endpoints"
import Modal from "@/components/custom/modal"
import OrderStatusChange from "./order-change-status"
import { useTypedStoreData } from "@/hooks/useStoreData"

export const statusColor: { [key: string]: string } = {
    "10": "text-primary",
    "20": "text-lime-500",
    "30": "text-amber-500",
    "35": "text-purple-500",
    "40": "text-red-500",
    "50": "text-green-500",
}

export const statusText: { [key: string]: string } = {
    "10": "Yaratildi",
    "20": "Logist topildi",
    "30": "Jarayonda",
    "35": "Yuk omborda",
    "40": "Favqulotda",
    "50": "Yakunlandi",
}

export const statusOptions = [
    {
        value: "",
        label: "Barchasi",
    },
    {
        value: "10",
        label: "Yaratildi",
    },
    {
        value: "20",
        label: "Logist topildi",
    },
    {
        value: "30",
        label: "Jarayonda",
    },
    {
        value: "35",
        label: "Yuk omborda",
    },
    {
        value: "40",
        label: "Favqulotda",
    },
    {
        value: "50",
        label: "Yakunlandi",
    },
]

export const OrdersPages = () => {
    const navigate = useNavigate()
    const { openModal: openModalDelete } = useModal("delete-order")
    const { storeData, setStoreData, clearUserData } =
        useTypedStoreData<OrderType>()
    const search = useSearch({ from: "/_main/" })
    const { data, isLoading } = useGet<OrdersTypeResults>(CONTAINERS, {
        params: search,
    })

    const handleDelete = (item: OrderType) => {
        clearUserData()
        openModalDelete()
        setStoreData(item)
    }

    const columns = useOrderColumns()
    return (
        <div className="w-full ">
            <div className="mb-5 flex justify-between items-center gap-4">
                <ParamTabs options={statusOptions} paramName="status" />
                <Button
                    onClick={() => navigate({ to: "/order-create" })}
                    icon={<Plus size={18} />}
                >
                    Buyurtma qo'shish
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={data?.results}
                loading={isLoading}
                onDelete={(row) => handleDelete(row.original)}
            />
            <DeleteModal
                modalKey="delete-order"
                id={storeData?.id}
                path={CONTAINERS}
            />
            <Modal
                size="max-w-xl"
                title={`Buyurtmani ${
                    statusText[String(storeData?.status)]
                } qilishni xohlaysizmi?`}
                modalKey="order-status-modal"
            >
                <OrderStatusChange />
            </Modal>
        </div>
    )
}
