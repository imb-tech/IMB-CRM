import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import { COURSE } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    item: Course | null
}

const CoursesCreate = ({ item }: Props) => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${COURSE}-add`)
    const form = useForm<Course>({ defaultValues: item || undefined })
    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yaratildi")
            closeModal()
            form.reset()
            queryClient.invalidateQueries({ queryKey: [COURSE] })
        },
    })
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yangilandi")
            closeModal()
            form.reset()
            queryClient.invalidateQueries({ queryKey: [COURSE] })
        },
    })
    const disabled = isPendingCreate || isPendingUpdate

    const onSubmit = (values: Course) => {
        console.log(values)
        if (item?.id) {
            mutateUpdate(`${COURSE}/${item.id}`, values)
        } else {
            mutateCreate(COURSE, values)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormInput required methods={form} label="Nomi" name="name" />
            <FormNumberInput
                required
                control={form.control}
                label="Narxi"
                name="price"
            />
            <FormInput
                required
                methods={form}
                label="Davomiyligi"
                name="month_duration"
            />
            <FormInput required methods={form} label="Filail" name="branch.name" />
            <FormTextarea
                required
                methods={form}
                label="Izoh"
                name="description"
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

export default CoursesCreate
