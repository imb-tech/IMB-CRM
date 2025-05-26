import { Button } from "@/components/ui/button"
import { BRANCH } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    item: Branch | null
}

const BranchesCreate = ({ item }: Props) => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${BRANCH}-add`)
    const form = useForm<Branch>({ defaultValues: item || undefined })
    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yaratildi")
            closeModal()
            form.reset()
            queryClient.invalidateQueries({queryKey:[BRANCH]})
        },
    })
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yangilandi")
            closeModal()
            form.reset()
            queryClient.invalidateQueries({queryKey:[BRANCH]})
        },
    })
    const disabled = isPendingCreate || isPendingUpdate

    const onSubmit = (values: Branch) => {
        console.log(values)
        if (item?.id) {
            mutateUpdate(`${BRANCH}/${item?.id}`, values)
        } else {
            mutateCreate(BRANCH, values)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            Ma'lumot qo'shiladi
            <div className="md:col-span-2 flex  justify-end">
                <Button
                    className="md:w-max w-full"
                    type="submit"
                    disabled={disabled}
                    loading={disabled}
                >
                    Saqlash
                </Button>
            </div>
        </form>
    )
}

export default BranchesCreate
