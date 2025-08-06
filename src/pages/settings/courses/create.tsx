import { FormCombobox } from "@/components/form/combobox"
import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import { COURSE } from "@/constants/api-endpoints"
import useMe from "@/hooks/useMe"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    item: Course | null
}

const CoursesCreate = ({ item }: Props) => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${COURSE}-add`)
    const form = useForm<Course>({ defaultValues: item || undefined })
    const { data, active_branch } = useMe()

    function onSuccess() {
        toast.success("Muvaffaqiyatli yangilandi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: [COURSE] })
    }

    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const disabled = isPendingCreate || isPendingUpdate

    const onSubmit = (values: Course) => {
        if (item?.id) {
            mutateUpdate(`${COURSE}/${item.id}`, values)
        } else {
            mutateCreate(COURSE, values)
        }
    }

    useEffect(() => {
        if (!item?.id && active_branch) {
            form.setValue("branch", active_branch!)
        }
    }, [active_branch])

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormInput required methods={form} label="Nomi" name="name" />
            <FormNumberInput
                required
                control={form.control}
                label="Narxi"
                name="price"
            />
            <FormNumberInput
                required
                control={form.control}
                label="Davomiyligi"
                name="duration"
            />
            <FormCombobox
                required
                control={form.control}
                options={data?.branches ?? []}
                labelKey="name"
                valueKey="id"
                label="Filial nomi"
                name="branch"
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
