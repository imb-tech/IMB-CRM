import { FormCombobox } from "@/components/form/combobox"
import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import { ROOM } from "@/constants/api-endpoints"
import { useStore } from "@/hooks/use-store"
import useMe from "@/hooks/useMe"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const RoomCreate = () => {
    const { store: item } = useStore<Room | null>("rooms")
    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${ROOM}-add`)
    const { data, active_branch } = useMe()

    const form = useForm<Room>({
        defaultValues: item || undefined,
    })

    function onSuccess() {
        toast.success("Muvaffaqiyatli yangilandi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: [ROOM] })
    }

    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const disabled = isPendingCreate || isPendingUpdate

    const onSubmit = (values: Room) => {
        if (item?.id) {
            mutateUpdate(`${ROOM}/${item.id}`, values)
        } else {
            mutateCreate(ROOM, values)
        }
    }

    useEffect(() => {
        if (!item?.id && active_branch) {
            form.setValue("branch", active_branch!)
        }
    }, [active_branch])

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormInput required methods={form} label="Xona nomi" name="name" />
            <FormCombobox
                required
                control={form.control}
                options={data?.branches ?? []}
                labelKey="name"
                valueKey="id"
                label="Filial nomi"
                name="branch"
            />

            <FormNumberInput
                control={form.control}
                name="limit"
                label="O'quvchi sig'imi"
                placeholder="Ixtiyoriy"
            />

            <Button
                className="md:w-max w-full float-end"
                type="submit"
                disabled={disabled}
                loading={disabled}
            >
                Saqlash
            </Button>
        </form>
    )
}

export default RoomCreate
