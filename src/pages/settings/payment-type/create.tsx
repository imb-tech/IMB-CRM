import { FormSelect } from "@/components/form/select"
import { Button } from "@/components/ui/button"
import { PAYMENT_TYPE } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    item: PaymentType | null
}

const paymentType = [
    { label: "Naqt", value: "cash" },
    { label: "Karta", value: "card" },
    { label: "Click", value: "click" },
    { label: "Bo'lib to'lash", value: "credit" },
]

const PaymentTypeCreate = ({ item }: Props) => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${PAYMENT_TYPE}-add`)
    const form = useForm<PaymentType>({ defaultValues: item || undefined })
    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yaratildi")
            closeModal()
            form.reset()
            queryClient.invalidateQueries({ queryKey: [PAYMENT_TYPE] })
        },
    })
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yangilandi")
            closeModal()
            form.reset()
            queryClient.invalidateQueries({ queryKey: [PAYMENT_TYPE] })
        },
    })
    const disabled = isPendingCreate || isPendingUpdate

    const onSubmit = (values: PaymentType) => {
        console.log(values)
        if (item?.id) {
            mutateUpdate(`${PAYMENT_TYPE}/${item?.id}`, values)
        } else {
            mutateCreate(PAYMENT_TYPE, values)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormSelect
                required
                options={paymentType}
                control={form.control}
                label="Nomi"
                name="name"
            />
            <Button
                className="md:w-max w-full float-end"
                type="submit"
                disabled={disabled}
                loading={disabled}
            >
                Saqlash
            </Button>
        </form>
    )
}

export default PaymentTypeCreate
