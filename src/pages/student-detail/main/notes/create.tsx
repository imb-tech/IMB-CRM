import { useModal } from "@/hooks/useModal"
import { Path, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { usePost } from "@/hooks/usePost"
import { AxiosError } from "axios"
import { STUDENT_NOTES } from "@/constants/api-endpoints"
import { useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import FormTextarea from "@/components/form/textarea"
import { toast } from "sonner"
import { usePatch } from "@/hooks/usePatch"
import { useStore } from "@/hooks/use-store"
import { handleFormError } from "@/lib/show-form-errors"

// const add5Hours = (dateString: string) => {
//     const date = new Date(dateString)
//     date.setHours(date.getHours() + 5)
//     return date
// }

type Props = {
    id: string
    url?: string
    refetchUrl?: string
    hasPayload?: boolean
}

export default function StudentNotesCreate({
    id,
    hasPayload = false,
    url = STUDENT_NOTES,
    refetchUrl = STUDENT_NOTES,
}: Props) {
    const { store: current } = useStore<Notes | null>("notes")
    const queryClient = useQueryClient()

    const { closeModal } = useModal("notes-add")

    const form = useForm<Notes>({
        defaultValues: hasPayload
            ? undefined
            : {
                  content: current?.content || "",
                  // remind_at: current?.remind_at
                  //     ? add5Hours(current.remind_at.toString())
                  //     : undefined,
                  // time: current?.remind_at
                  //     ? add5Hours(current.remind_at.toString())
                  //           .toISOString()
                  //           .substring(11, 16)
                  //     : "",
              },
    })

    const onSuccess = useCallback(() => {
        toast.success("Muvaffaqiyatli qo'shildi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: [refetchUrl] })
    }, [closeModal, form, queryClient])

    const { mutate: mutatePost, isPending: isPendingPost } = usePost({
        onSuccess,
        onError: (err) => handleFormError(err, form),
    })
    const { mutate: mutatePatch, isPending: isPendingPatch } = usePatch({
        onSuccess,
        onError: (err) => handleFormError(err, form),
    })

    const handleSubmit = useCallback(
        (values: Notes) => {
            // const date = new Date(values.remind_at)
            // const [hours, minutes] = values.time.split(":")
            // date.setHours(Number(hours), Number(minutes), 0)
            // const formattedDate = date.toISOString()

            const payload = {
                content: values.content,
                user: id,
                // remind_at: formattedDate,
            }
            const payloadLeads = {
                note: values.content,
                lead: id,
                // remind_at: formattedDate,
            }

            if (current?.id) {
                mutatePatch(`${url}/${current?.id}`, payload)
            } else {
                mutatePost(url, hasPayload ? payloadLeads : payload)
            }
        },
        [mutatePatch, mutatePost, id],
    )

    return (
        <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            {/* <div className="flex items-start justify-between gap-2">
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
                <FormInput
                    type="time"
                    required
                    methods={form}
                    name="time"
                    placeholder="Soat"
                    label="Aniq vaqti"
                    wrapperClassName="w-28"
                    hideError
                />
            </div> */}

            <FormTextarea
                required
                methods={form}
                name="content"
                placeholder="Shu yerga yozing..."
                autoComplete="off"
                label="Eslatma"
                rows={4}
            />

            <Button
                disabled={isPendingPatch || isPendingPost}
                loading={isPendingPatch || isPendingPost}
            >
                Saqlash
            </Button>
        </form>
    )
}
