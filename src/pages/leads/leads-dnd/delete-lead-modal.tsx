import { useStore } from "@/hooks/use-store"
import { useModal } from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { usePatch } from "@/hooks/usePatch"
import Modal from "@/components/custom/modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function DeleteLeadModal() {
    const { id } = useParams({ strict: false })
    const { closeModal } = useModal("confirm-delete")
    const { store } = useStore<{
        id: number
        type: "delete" | "success"
        name: string
    }>("conf-lead")

    const queryClient = useQueryClient()

    const queryKeyUsers = [
        "leads/crud",
        ...Object.values({ condition: "active", status__pipeline: id }),
    ]

    const { mutate, isPending } = usePatch()

    function handleConfirm() {
        const drpId = Number(store?.id)

        const originUsers =
            queryClient.getQueryData<LeadFields[]>(queryKeyUsers)

        queryClient.setQueryData(
            queryKeyUsers,
            originUsers?.filter((usr) => usr.id !== drpId),
        )

        mutate(
            `leads/update/${drpId}`,
            {
                condition: store?.type === "delete" ? "deleted" : "success",
            },
            {
                onError() {
                    queryClient.setQueryData(queryKeyUsers, originUsers)
                },
                onSuccess() {
                    closeModal()
                },
            },
        )
    }

    return (
        <Modal modalKey="confirm-delete" title="O'zgarishni tasdiqlang">
            <div className="pt-4">
                <h1 className="text-xl">
                    {store?.name}ni
                    <Badge
                        color="emerald"
                        className={cn(
                            "text-lg rounded-md mx-2 font-light",
                            store?.type == "delete" ?
                                "text-rose-500 bg-rose-500/10 hover:bg-rose-500/10"
                            :   "text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/10",
                        )}
                    >
                        {store?.type == "delete" ?
                            "o'chirilgan"
                        :   "muvaffaqiyatli mijoz"}
                    </Badge>
                    holatiga o'zgartirmoqchimisiz?
                </h1>

                <Button
                    className="mt-5 w-full"
                    onClick={handleConfirm}
                    loading={isPending}
                >
                    Tasdiqlash
                </Button>
            </div>
        </Modal>
    )
}
