import { useModal } from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { ReactNode, useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { Button } from "../ui/button"
import Modal from "./modal"
import { useDelete } from "@/hooks/useDelete"
import { Trash2 } from "lucide-react"

interface IProps {
    url?: string
    path: string
    id: string | number | undefined
    name?: ReactNode
    onSuccessAction?: () => void
    modalKey?: string
    disableRefetch?: boolean
    refetchKey?: string
    refetchKeys?: unknown[]
}

export default function DeleteModal({
    path,
    id,
    name = "",
    onSuccessAction,
    modalKey = "delete",
    disableRefetch = false,
    refetchKeys,
    refetchKey,
    url,
}: IProps) {
    const navigate = useNavigate()
    const { closeModal } = useModal(modalKey)
    const queryClient = useQueryClient()

    const { mutate, isPending } = useDelete({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli o'chirildi", { icon: "✅" })
            if (onSuccessAction) {
                onSuccessAction()
            }
            if (!disableRefetch) {
                queryClient.refetchQueries({
                    queryKey: [path],
                })
            }
            if (refetchKeys) {
                queryClient.refetchQueries({
                    predicate: (q) => {
                        return refetchKeys?.includes(q.queryKey[0])
                    },
                })
            } else if (refetchKey) {
                queryClient.removeQueries({ queryKey: [refetchKey] })
            }
            closeModal()
            if (url) {
                navigate({ to: url })
            }
        },
    })

    const handleDelete = () => {
        mutate(path + `/${id}`)
    }

    return (
        <Modal
            size="max-w-md"
            modalKey={modalKey}
            className={"rounded-2xl"}
            classNameIcon={"hidden"}
        >
            <div className="px-3 py-2">
                <div className="flex flex-col items-center text-center">
                    <div
                        className={
                            "flex items-center justify-center bg-red-600/10 rounded-full p-4 mb-3"
                        }
                    >
                        <Trash2 className="w-10 h-10 text-red-600 drop-shadow-lg" />
                    </div>

                    <h2 className={"text-xl font-bold text-balance mb-2 "}>
                        Siz haqiqatdan {name} ham o'chirishni xohlaysizmi?
                    </h2>
                </div>

                <p
                    className={
                        "text-sm mb-4 text-muted-foreground text-pretty text-center leading-relaxed"
                    }
                >
                    Bu qaytarib bo'lmas jarayon! <br /> O'chirilgan
                    ma'lumotlarni qayta tiklash mumkin emas.
                </p>

                <div className="flex gap-4 justify-center">
                    <Button
                        variant="secondary"
                        onClick={closeModal}
                        className="px-8 py-2 dark:text-white bg-transparent hover:bg-muted transition-all duration-200"
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        loading={isPending}
                        disabled={isPending}
                        variant={"destructive"}
                        onClick={handleDelete}
                        className={
                            "px-8 py-2 bg-gradient-to-r from-red-600 to-red-600/80 hover:from-red-600/90 hover:to-red-600 text-red-600-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                        }
                    >
                        O'chirish
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
