import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { CONTAINER_TYPE } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useTypedStoreData } from "@/hooks/useStoreData"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const ContainerCreate = () => {
    const { closeModal } = useModal("container-modal")

    const { storeData } = useTypedStoreData<ContainerType>()
    const form = useForm<ContainerType>({
        defaultValues: storeData ?? {},
    })
    const queryClient = useQueryClient()
    const { mutate: cretaeMutate, isPending: isPendingCreate } = usePost({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli qo'shildi")
            closeModal()
            queryClient.invalidateQueries({ queryKey: [CONTAINER_TYPE] })
            form.reset()
        },
    })
    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yangilandi")
            closeModal()
            queryClient.invalidateQueries({ queryKey: [CONTAINER_TYPE] })
            form.reset()
        },
    })

    const onSubmit = (data: ContainerType) => {
        if (storeData?.id) {
            updateMutate(`${CONTAINER_TYPE}/${storeData?.id}`, data)
        } else {
            cretaeMutate(CONTAINER_TYPE, data)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormInput
                required
                methods={form}
                name="name"
                label="Konteyner nomi"
            />
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

export default ContainerCreate
