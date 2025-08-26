import { useModal } from "@/hooks/useModal"
import { Path, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { usePost } from "@/hooks/usePost"
import { AxiosError } from "axios"
import { STUDENT_NOTES } from "@/constants/api-endpoints"
import { useCallback } from "react"
import { useParams } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import FormTextarea from "@/components/form/textarea"
import { FormDatePicker } from "@/components/form/date-picker"

export default function StudentNotesCreate({
    current,
}: {
    current: Notes | null
}) {
    const queryClient = useQueryClient()

    const { id } = useParams({ from: "/_main/students/$id/_main/notes" })

    const { closeModal } = useModal("notes-add")

    const { mutate, isPending } = usePost({
        onSuccess() {
            closeModal()
            form.reset({})
            queryClient.invalidateQueries({
                queryKey: [STUDENT_NOTES],
            })
        },
        onError(errors: AxiosError) {
            for (const [k, v] of Object.entries(errors.response?.data ?? {})) {
                form.setError(k as Path<Notes>, {
                    type: "validate",
                    message: v,
                })
            }
        },
    })

    const form = useForm<Notes>({
        defaultValues: {
            content: current?.content,
        },
    })

    const handleSubmit = useCallback(
        (v: Notes) => {
            mutate(STUDENT_NOTES, {
                content: v.content,
                remind_at: v.remind_at,
                user: id,
            })
        },
        [current, mutate],
    )

    return (
        <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            
            {!current?.id && (
                <FormDatePicker
                    control={form.control}
                    name="remind_at"
                    label="Qo'shilish sanasi"
                    className="!w-full"
                    required
                    fullWidth
                    calendarProps={{
                        fromDate: new Date(),
                    }}
                />
            )}

            <FormTextarea
                required
                methods={form}
                name="content"
                placeholder="Shu yerga yozing..."
                autoComplete="off"
                label="Eslatma"
                rows={4}
            />

            <Button loading={isPending}>Saqlash</Button>
        </form>
    )
}
