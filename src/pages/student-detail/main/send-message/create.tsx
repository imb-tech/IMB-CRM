import { useModal } from "@/hooks/useModal"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { usePost } from "@/hooks/usePost"
import { SMS_LIST } from "@/constants/api-endpoints"
import { useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import FormTextarea from "@/components/form/textarea"
import { toast } from "sonner"
import { handleFormError } from "@/lib/show-form-errors"

export default function StudentMessageCreate({ id }: { id: string }) {
    const queryClient = useQueryClient()

    const { closeModal } = useModal("message-add")
    const form = useForm<SendMessage>()

    const onSuccess = useCallback(() => {
        toast.success("Muvaffaqiyatli qo'shildi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: [SMS_LIST] })
    }, [closeModal, form, queryClient])

    const { mutate, isPending } = usePost({
        onSuccess,
        onError: (err) => handleFormError(err, form),
    })

    const handleSubmit = useCallback(
        (values: SendMessage) => {
            mutate(SMS_LIST, {
                sms_receivers: [
                    {
                        message: values.message,
                        user: id,
                    },
                ],
            })
        },
        [mutate, id],
    )

    return (
        <form
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            <FormTextarea
                required
                methods={form}
                name="message"
                placeholder="Shu yerga yozing..."
                autoComplete="off"
                label="Eslatma"
                rows={4}
            />

            <Button loading={isPending}>Saqlash</Button>
        </form>
    )
}
