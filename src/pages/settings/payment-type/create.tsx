import FormInput from "@/components/form/input"
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

const PaymentTypeCreate = ({ item }: Props) => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${PAYMENT_TYPE}-add`)
    const form = useForm<PaymentType>({ defaultValues: item || undefined })

    function onSuccess() {
        toast.success("Muvaffaqiyatli yangilandi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: [PAYMENT_TYPE] })
    }

    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })

    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })
    const disabled = isPendingCreate || isPendingUpdate

    const onSubmit = (values: PaymentType) => {
        if (item?.id) {
            mutateUpdate(`${PAYMENT_TYPE}/${item?.id}`, values)
        } else {
            mutateCreate(PAYMENT_TYPE, values)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormInput required methods={form} label="Nomi" name="name" />
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
