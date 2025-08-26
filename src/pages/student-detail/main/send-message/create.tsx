import { useModal } from "@/hooks/useModal"
import { Path, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { usePost } from "@/hooks/usePost"
import { AxiosError } from "axios"
import { SMS_LIST } from "@/constants/api-endpoints"
import { useCallback } from "react"
import { useParams } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import FormTextarea from "@/components/form/textarea"
import { toast } from "sonner"

export default function StudentMessageCreate() {
    const queryClient = useQueryClient()

    const { id } = useParams({ from: "/_main/students/$id/_main/send-message" })

    const { closeModal } = useModal("message-add")
    const form = useForm<SendMessage>()

    const onSuccess = useCallback(() => {
        toast.success("Muvaffaqiyatli qo'shildi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: [SMS_LIST] })
    }, [closeModal, form, queryClient])

    const onError = useCallback(
        (errors: AxiosError) => {
            for (const [k, v] of Object.entries(errors.response?.data ?? {})) {
                form.setError(k as Path<SendMessage>, {
                    type: "validate",
                    message: v,
                })
            }
        },
        [form],
    )

    const { mutate, isPending } = usePost({ onSuccess, onError })

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
