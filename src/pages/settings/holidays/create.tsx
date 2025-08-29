import { FormDatePicker } from "@/components/form/date-picker"
import { FormMultiCombobox } from "@/components/form/multi-combobox"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import { HOLIDAY } from "@/constants/api-endpoints"
import { useStore } from "@/hooks/use-store"
import useMe from "@/hooks/useMe"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const HolidayCreate = () => {
    const { store: item } = useStore<Holiday | null>("holiday")

    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${HOLIDAY}-add`)
    const { active_branch, data } = useMe()
    const form = useForm<Holiday>({
        defaultValues: item || { branches: [active_branch!] },
    })

    function onSuccess() {
        toast.success("Muvaffaqiyatli yangilandi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: [HOLIDAY] })
    }

    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const disabled = isPendingCreate || isPendingUpdate

    const onSubmit = (values: Holiday) => {
        delete values?.is_active
        if (item?.id) {
            mutateUpdate(`${HOLIDAY}/${item.id}`, values)
        } else {
            mutateCreate(HOLIDAY, values)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormDatePicker
                required
                control={form.control}
                label="Sana"
                name="date"
                className="mb-2"
            />

            <FormMultiCombobox
                control={form.control}
                name="branches"
                options={data?.branches}
                labelKey="name"
                valueKey="id"
                required
            />

            <FormTextarea required methods={form} label="Sabab" name="reason" />
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

export default HolidayCreate
