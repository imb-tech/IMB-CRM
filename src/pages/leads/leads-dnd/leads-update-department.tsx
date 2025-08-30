import { useGet } from "@/hooks/useGet"
import { pipelineUrl } from "../lead-deal-selector"
import useMe from "@/hooks/useMe"
import { useForm } from "react-hook-form"
import { useCallback } from "react"
import { toast } from "sonner"
import { useModal } from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { usePost } from "@/hooks/usePost"
import { handleFormError } from "@/lib/show-form-errors"
import { FormCombobox } from "@/components/form/combobox"
import { Button } from "@/components/ui/button"
import { useParams } from "@tanstack/react-router"

type Props = {
    id: string
}

type FormValues = {
    branch: number
    department: string
}

const LeadsUpdateDepartment = ({ id: lead }: Props) => {
    const { id } = useParams({ from: "/_main/leads/varonka/$id/" })
    const queryClient = useQueryClient()
    const { closeModal } = useModal("update-department")
    const { data: dataLeadDepartment } = useGet<Pipeline[]>(pipelineUrl, {
        params: { is_active: true },
    })
    const { data, active_branch } = useMe()

    const form = useForm<FormValues>({
        defaultValues: {
            branch: active_branch || undefined,
            department: id,
        },
    })

    const onSuccess = useCallback(() => {
        toast.success("Muvaffaqiyatli qo'shildi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: ["url"] })
    }, [closeModal, form, queryClient])

    const { mutate, isPending } = usePost({ onSuccess })

    const onSubmit = useCallback(
        (values: FormValues) => {
            mutate("url", values, {
                onError: (err) => handleFormError(err, form),
            })
        },
        [mutate, id, form],
    )

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-1 px-1"
        >
            <FormCombobox
                control={form.control}
                name="branch"
                options={data?.branches}
                labelKey="name"
                valueKey="id"
                label="Filial tanlang"
                required
            />
            <FormCombobox
                control={form.control}
                name="department"
                options={dataLeadDepartment}
                labelKey="name"
                valueKey="id"
                label="Bo'lim tanlang"
                required
            />
            <div className="flex justify-end">
                <Button type="submit" disabled={isPending} loading={isPending}>
                    Saqlash
                </Button>
            </div>
        </form>
    )
}

export default LeadsUpdateDepartment
