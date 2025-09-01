import FormInput from "@/components/form/input"
import FormTimeInput from "@/components/form/time-input"
import { Button } from "@/components/ui/button"
import { BRANCH, PROFILE } from "@/constants/api-endpoints"
import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const BranchesCreate = () => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${BRANCH}-add`)
    const { store: item } = useStore<Branch | null>("branch")

    const form = useForm<Branch>({
        defaultValues: item
            ? {
                ...item,
                start_time: item?.start_time?.slice(0, 5),
                end_time: item?.end_time?.slice(0, 5),
            }
            : undefined,
    })

    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yaratildi")
            closeModal()
            form.reset()
            queryClient.invalidateQueries({ queryKey: [BRANCH] })
            queryClient.refetchQueries({ queryKey: [PROFILE] })
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
            <FormTimeInput
                step={900}
                required
                methods={form}
                label="Ish boshlanish vaqti"
                name="start_time"
            />
            <FormTimeInput
                step={900}
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
