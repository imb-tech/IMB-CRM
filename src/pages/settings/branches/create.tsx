import FormInput from "@/components/form/input"
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
            queryClient.invalidateQueries({ queryKey: [BRANCH] })
        },
    })

    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yangilandi")
            closeModal()
            form.reset()
            queryClient.invalidateQueries({ queryKey: [BRANCH] })
        },
    })
    const disabled = isPendingCreate || isPendingUpdate

    const onSubmit = (values: Branch) => {
        if (item?.id) {
            mutateUpdate(`${BRANCH}/${item?.id}`, values)
        } else {
            mutateCreate(BRANCH, values)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormInput required methods={form} label="Nomi" name="name" />
            <FormInput
                type="time"
                required
                methods={form}
                label="Ish boshlanish vaqti"
                name="start_time"
            />
            <FormInput
                type="time"
                required
                methods={form}
                label="Ish tugash vaqti"
                name="end_time"
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

export default BranchesCreate
