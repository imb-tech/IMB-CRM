import { FormDatePicker } from "@/components/form/date-picker"
import { Button } from "@/components/ui/button"
import { GROUP_STUDENTS } from "@/constants/api-endpoints"
import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { useQueryClient } from "@tanstack/react-query"
import { TriangleAlert } from "lucide-react"
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
            <div className="bg-rose-500/10 p-3 mb-3 rounded text-rose-500 flex gap-2">
                <p>
                    <TriangleAlert className="inline mr-2 mb-1" size={16} />
                    Qo‘shilish sanasini o‘zgartirsangiz, o‘quvchi balansi ham
                    o‘zgarishi mumkin. Ogoh bo‘ling.
                </p>
            </div>

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
