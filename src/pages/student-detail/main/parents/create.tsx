import { useModal } from "@/hooks/useModal"
import { Path, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { usePost } from "@/hooks/usePost"
import { AxiosError } from "axios"
import { STUDENT_PARENTS } from "@/constants/api-endpoints"

import { useCallback } from "react"
import { useParams } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import FormInput from "@/components/form/input"
import PhoneField from "@/components/form/phone-field"

export default function StudentParentsCreate({
    current,
}: {
    current: StudentParents | null
}) {
    const queryClient = useQueryClient()

    const { id } = useParams({ from: "/_main/students/$id/_main/parents" })

    const { closeModal } = useModal("parents-add")

    const { mutate, isPending } = usePost({
        onSuccess() {
            closeModal()
            form.reset({})
            queryClient.invalidateQueries({
                queryKey: [STUDENT_PARENTS],
            })
        },
        onError(errors: AxiosError) {
            for (const [k, v] of Object.entries(errors.response?.data ?? {})) {
                form.setError(k as Path<StudentParents>, {
                    type: "validate",
                    message: v,
                })
            }
        },
    })

    const form = useForm<StudentParents>({
        defaultValues: {
            full_name: current?.full_name,
            phone: current?.phone,
            position: current?.position,
        },
    })

    const handleSubmit = useCallback(
        (v: StudentParents) => {
            mutate(STUDENT_PARENTS, {
                full_name: v.full_name,
                phone: v.phone,
                position: v.position,
                student: id,
            })
        },
        [current, mutate],
    )

    return (
        <form
            className="flex flex-col gap-3 py-2"
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            <FormInput
                required
                methods={form}
                name="position"
                placeholder="Otasi, Onasi, Akasi, Opasi..."
                label="Masul shaxs"
            />

            <FormInput
                required
                methods={form}
                name="full_name"
                placeholder="Ma'sul shaxs"
                autoComplete="off"
                label="FIO"
            />
            <PhoneField
                required
                methods={form}
                name="phone"
                label="Telefon raqam"
            />

            <Button loading={isPending}>Saqlash</Button>
        </form>
    )
}
