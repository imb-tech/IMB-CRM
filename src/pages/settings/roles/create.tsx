import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { ROLE } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    item: Role | null
}

const RoleCreate = ({ item }: Props) => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${ROLE}-add`)
    const form = useForm<Role>({ defaultValues: item || undefined })
    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yaratildi")
            closeModal()
            form.reset()
            queryClient.invalidateQueries({ queryKey: [ROLE] })
        },
    })
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yangilandi")
            closeModal()
            form.reset()
            queryClient.invalidateQueries({ queryKey: [ROLE] })
        },
    })
    const disabled = isPendingCreate || isPendingUpdate

    const onSubmit = (values: Role) => {
        console.log(values)
        if (item?.id) {
            mutateUpdate(`${ROLE}/${item.id}`, values)
        } else {
            mutateCreate(ROLE, values)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormInput required methods={form} label="Nomi" name="name" />
            <FormInput
                required
                methods={form}
                label="Ruxsatlar"
                name="permissions"
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

export default RoleCreate
