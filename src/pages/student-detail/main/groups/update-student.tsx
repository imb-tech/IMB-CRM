import { FormDatePicker } from "@/components/form/date-picker"
import { Button } from "@/components/ui/button"
import { GROUP_STUDENTS, STUDENT_GROUP } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { useQueryClient } from "@tanstack/react-query"
import { TriangleAlert } from "lucide-react"
import { useForm } from "react-hook-form"

type Props = {
    current: Student | undefined
}

export default function UpdateStudentDate({ current }: Props) {
    const { closeModal } = useModal("student-groups-update")
    const form = useForm<{ start_date: string }>({
        defaultValues: {
            start_date: current?.start_date,
        },
    })
    const qc = useQueryClient()

    const { mutate, isPending } = usePatch()

    function handleSubmit({ start_date }: { start_date: string }) {
        mutate(
            GROUP_STUDENTS + "/" + current?.id,
            {
                start_date: start_date,
            },
            {
                onSuccess() {
                    qc.removeQueries({ queryKey: [STUDENT_GROUP] })
                    closeModal()
                },
            },
        )
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="bg-red-500/10 p-3 mb-3 rounded text-sm text-red-500 flex gap-2">
                <p>
                    <TriangleAlert className="inline mr-2  mb-1" size={16} />
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
