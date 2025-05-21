import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { STATION } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useTypedStoreData } from "@/hooks/useStoreData"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const StationsCreate = () => {
    const { closeModal } = useModal("stations-modal")
    const { storeData } = useTypedStoreData<StationsType>()
    const form = useForm<StationsType>({
        defaultValues: storeData ?? {},
    })
    const queryClient = useQueryClient()
    const { mutate: cretaeMutate, isPending: isPendingCreate } = usePost({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli qo'shildi")
            closeModal()
            queryClient.invalidateQueries({ queryKey: [STATION] })
            form.reset()
        },
    })
    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yangilandi")
            closeModal()
            queryClient.invalidateQueries({ queryKey: [STATION] })
            form.reset()
        },
    })

    const onSubmit = (data: StationsType) => {
        if (storeData?.id) {
            updateMutate(`${STATION}/${storeData?.id}`, data)
        } else {
            cretaeMutate(STATION, data)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormInput
                required
                methods={form}
                name="name"
                label="Stansiya nomi"
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

export default StationsCreate
