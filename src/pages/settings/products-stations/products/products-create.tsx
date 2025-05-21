import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { PRODUCT } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useTypedStoreData } from "@/hooks/useStoreData"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const ProductsCreate = () => {
    const { closeModal } = useModal("product-modal")
    const { storeData } = useTypedStoreData<ProductsType>()
    const queryClient = useQueryClient()
    const { mutate: cretaeMutate, isPending: isPendingCreate } = usePost({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli qo'shildi")
            closeModal()
            queryClient.invalidateQueries({ queryKey: [PRODUCT] })
            form.reset()
        },
    })
    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yangilandi")
            closeModal()
            queryClient.invalidateQueries({ queryKey: [PRODUCT] })
            form.reset()
        },
    })
    const form = useForm<ProductsType>({
        defaultValues: storeData ?? {},
    })

    const onSubmit = (data: ProductsType) => {
        if (storeData?.id) {
            updateMutate(`${PRODUCT}/${storeData?.id}`, data)
        } else {
            cretaeMutate(PRODUCT, data)
        }
    }



    return (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormInput required methods={form} name="name" label="Nomi" />
                <FormInput required methods={form} name="code" label="Kodi" />

                <div className="flex justify-end ">
                    <Button
                        disabled={isPendingCreate || isPendingUpdate}
                        loading={isPendingCreate || isPendingUpdate}
                        type="submit"
                    >
                        Saqlash
                    </Button>
                </div>
            </form>
    )
}

export default ProductsCreate
