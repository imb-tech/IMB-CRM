import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import { CONTAINERS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { useTypedStoreData } from "@/hooks/useStoreData"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const OrderStatusChange = () => {
    const { closeModal } = useModal("order-status-modal")
    const { storeData } = useTypedStoreData<OrderType>()
    const form = useForm<{hint:string}>()

    const queryClient = useQueryClient()
    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yangilandi")
            closeModal()
            queryClient.invalidateQueries({ queryKey: [CONTAINERS] })
            form.reset()
        },
    })

    const onSubmit = (data: {hint:string}) => {
        updateMutate(`${CONTAINERS}/${storeData?.id}`, {
            ...data,
            status: storeData?.status,
        })
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormTextarea
                required
                methods={form}
                name="hint"
                label="Buyurtmani statusini o'zgartirish sababini kiriting!!!"
            />
            <div className="flex justify-end ">
                <Button
                    disabled={isPendingUpdate}
                    loading={isPendingUpdate}
                    type="submit"
                >
                    Tasdiqlash
                </Button>
            </div>
        </form>
    )
}

export default OrderStatusChange
