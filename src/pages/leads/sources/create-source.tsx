import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModal"
import { useForm } from "react-hook-form"
import { leadSources } from "./get-source-icon"
import { cn } from "@/lib/utils"
import { usePost } from "@/hooks/usePost"
import { usePatch } from "@/hooks/usePatch"
import { useQueryClient } from "@tanstack/react-query"
import { useStore } from "@/hooks/use-store"

const url = "leads/common/sources"

export default function CreateSource({ onSuccess: onSuccessProp, modalKey = 'default' }: { onSuccess?: (data: Source) => void, modalKey?: string }) {
    const { store } = useStore<Source>("source")

    const form = useForm<Source>({
        defaultValues: {
            icon: "website",
            ...store,
        },
    })
    const queryClient = useQueryClient()

    const { closeModal } = useModal(modalKey)

    const watchIcon = form.watch("icon")

    async function onSuccess(data: Source) {
        closeModal()
        await queryClient.refetchQueries({ queryKey: [url] }).then(() => onSuccessProp?.(data))
    }

    const { mutate, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isPatching } = usePatch({ onSuccess })

    function handleSubmit(vals: Source) {
        if (vals.id) {
            patch(`${url}/${vals.id}`, vals)
        } else mutate(url, vals)
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="pt-2"
        >
            <FormInput
                methods={form}
                name="name"
                required
                label={"Nomi"}
            />

            <p className="mt-5">{"Belgi tanlang"}</p>
            <div className="flex gap-3 flex-wrap pb-3 pt-1">
                {leadSources?.map((Ic, index) => {
                    return (
                        <button
                            key={index}
                            className={cn(
                                "bg-secondary cursor-pointer rounded-sm p-2 border border-secondary",
                                watchIcon === Ic.key
                                    ? "border-primary"
                                    : "",
                            )}
                            type="button"
                            onClick={() =>
                                form.setValue("icon", Ic.key)
                            }
                        >
                            <Ic.icon style={{ color: Ic.color }} />
                        </button>
                    )
                })}
            </div>

            <Button
                className="mt-4 w-full"
                loading={isPending || isPatching}
            >
                {"Saqlash"}
            </Button>
        </form>
    )
}
