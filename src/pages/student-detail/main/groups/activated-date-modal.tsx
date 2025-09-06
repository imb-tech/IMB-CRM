import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { FormDatePicker } from "@/components/form/date-picker"
import { useStore } from "@/hooks/use-store"
import { usePost } from "@/hooks/usePost"
import { STUDENT_GROUP } from "@/constants/api-endpoints"
import { useQueryClient } from "@tanstack/react-query"
import { useModal } from "@/hooks/useModal"
import { handleFormError } from "@/lib/show-form-errors"

export const ActivatedDateModal = () => {
    const qC = useQueryClient()
    const { store, remove } = useStore<Student>('student-data')
    const { closeModal } = useModal('activate')
    const { mutate, isPending } = usePost()

    const handleConfirm = (vals: { activated_date: string }) => {
        mutate(
            "platform/group-students/change-status",
            {
                status: 1,
                group_student: store?.id,
                activated_date: vals.activated_date
            },
            {
                onSuccess() {
                    qC.removeQueries({ queryKey: [STUDENT_GROUP] })
                    remove()
                    closeModal()
                },
                onError(error) {
                    handleFormError(error, form)
                },
            },
        )
    }

    const form = useForm<{
        activated_date: string
    }>({
        defaultValues: {
            activated_date: store?.activated_date ? store.activated_date : store?.start_date
        }
    })

    const handleCancel = () => {
        form.reset()
    }

    return (
        <form onSubmit={form.handleSubmit(handleConfirm)} className="flex flex-col">
            {store?.id && <FormDatePicker
                fullWidth
                required
                control={form.control}
                label="Aktivlashtirish sanasini tanlang"
                className='min-w-full'
                name="activated_date"
                calendarProps={{
                    toDate: new Date(),
                    fromDate: new Date(store.start_date)
                }}
            />}
            <div className="!flex !flex-row items-center justify-end gap-4 mt-3">
                <Button type="button" onClick={handleCancel} variant="destructive">
                    Bekor qilish
                </Button>
                <Button loading={isPending}>Tasdiqlash</Button>
            </div>
        </form>
    )
}
