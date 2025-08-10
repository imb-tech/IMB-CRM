import { FormDatePicker } from "@/components/form/date-picker"
import { Button } from "@/components/ui/button"
import { GROUP_STUDENTS } from "@/constants/api-endpoints"
import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function UpdateStudent() {
    const { store: current, remove } = useStore<GroupStudent>("student-data")
    const { closeModal } = useModal("update")
    const form = useForm<GroupStudent>({
        defaultValues: current,
    })
    const qc = useQueryClient()

    const { mutate, isPending } = usePatch()

    function handleSubmit(v: GroupStudent) {
        mutate(
            GROUP_STUDENTS + "/" + v.id,
            {
                start_date: v.start_date,
            },
            {
                onSuccess() {
                    remove()
                    qc.removeQueries({ queryKey: [GROUP_STUDENTS] })
                    closeModal()
                },
            },
        )
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormDatePicker
                label="Guruhga qo'shilgan sana"
                control={form.control}
                name="start_date"
                fullWidth
                className="!w-full"
            />

            <Button className="w-full mt-4" loading={isPending}>
                Saqlash
            </Button>
        </form>
    )
}
