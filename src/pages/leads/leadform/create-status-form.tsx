import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { useForm } from "react-hook-form"

const url = "leads/pipeline/status"

export default function CreateStatusFrom({
    defaultValues,
    creatingOrder,
}: {
    defaultValues?: LeadStatus
    creatingOrder?: number
}) {
    const form = useForm<LeadStatus>({ defaultValues })
    const { closeModal } = useModal("create-status")
    const { id } = useParams({ strict: false })
    const queryClient = useQueryClient()

    function onSuccess() {
        queryClient.removeQueries({ queryKey: [url] })
        closeModal()
    }

    const { mutate, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isPatching } = usePatch({ onSuccess })

    function onSubmit(vals: LeadStatus) {
        const fv = {
            ...vals,
            pipeline: Number(id),
        }
        if (defaultValues?.id) {
            patch(`${url}/${fv.id}`, fv)
        } else
            mutate(url, {
                ...fv,
                order: creatingOrder,
            })
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput required methods={form} name="name" label={"Nomi"} />
            <Button className="w-full mt-4" loading={isPending || isPatching}>
                {"Saqlash"}
            </Button>
        </form>
    )
}
