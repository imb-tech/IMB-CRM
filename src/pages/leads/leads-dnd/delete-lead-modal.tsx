import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { usePatch } from "@/hooks/usePatch"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

export default function DeleteLeadModal() {
    const { id } = useParams({ strict: false })
    const { closeModal } = useModal("confirm-delete")
    const { store } = useStore<Lead>("lead-data")
    const [text, setText] = useState<string>("")

    const queryClient = useQueryClient()

    const queryKeyUsers = [
        "leads/crud",
        ...Object.values({ condition: "active", status__pipeline: id }),
    ]

    const queryKeyStatus = [
        "leads/pipeline/status",
        ...Object.values({ is_active: true, pipeline: id }),
    ]

    const { mutate: mutatePatch, isPending: isPendingPatch } = usePatch()

    function handleConfirm() {
        const drpId = Number(store?.id)

        const originUsers =
            queryClient.getQueryData<LeadFields[]>(queryKeyUsers)

        queryClient.setQueryData(
            queryKeyUsers,
            originUsers?.filter((usr) => usr.id !== drpId),
        )

        mutatePatch(
            `leads/update/${drpId}`,
            {
                condition: "loosed",
                is_active: false,
                reason: text,
            },
            {
                onError() {
                    queryClient.setQueryData(queryKeyUsers, originUsers)
                },
                onSuccess() {
                    queryClient.refetchQueries({ queryKey: queryKeyStatus })
                    closeModal()
                },
            },
        )
    }

    return (
        <Modal modalKey="confirm-delete" title="O'chirishni tasdiqlang">
            <div className="pt-4 space-y-4">
                <h1 className="text-xl">
                    Haqiqatan ham bu {store?.name}ni
                    <Badge
                        color="emerald"
                        className={
                            "text-lg rounded-md mx-2 font-light text-red-500 bg-red-500/10 hover:bg-red-500/10"
                        }
                    >
                        o'chirmoqchimisiz?
                    </Badge>
                </h1>
                <Textarea onChange={(e) => setText(e.target.value)} />

                <Button
                    className="mt-5 w-full"
                    onClick={handleConfirm}
                    loading={isPendingPatch}
                    disabled={!text.trim() || isPendingPatch}
                >
                    Tasdiqlash
                </Button>
            </div>
        </Modal>
    )
}
