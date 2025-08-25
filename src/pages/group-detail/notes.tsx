import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, User, Edit2, Trash2, Check, X, Plus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import SectionHeader from "@/components/elements/section-header"
import Modal from "@/components/custom/modal"
import { useGet } from "@/hooks/useGet"
import { useParams } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import FormTextarea from "@/components/form/textarea"
import { useModal } from "@/hooks/useModal"
import { usePost } from "@/hooks/usePost"
import { formatDate } from "@/lib/utils"
import { usePatch } from "@/hooks/usePatch"
import DeleteModal from "@/components/custom/delete-modal"

interface Reminder {
    id: number
    author_name: string
    created_at: string
    updated_at: string
    content: string
    is_active: boolean
    group: number
}

const url = "platform/groups/crud/notes"

export default function GroupNotes() {
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editText, setEditText] = useState("")
    const { openModal, closeModal } = useModal()
    const { openModal: openDelete } = useModal("delete")

    const { id: group } = useParams({ from: "/_main/groups/$id/_main/notes" })

    const { data, refetch } = useGet<ListResp<Reminder>>(url, {
        params: { group },
    })

    const handleEdit = (reminder: Reminder) => {
        form.setValue("id", reminder.id)
        form.setValue("content", reminder.content)
        openModal()
    }

    const handleSaveEdit = (id: number) => {
        setEditingId(null)
        setEditText("")
    }

    function onSuccess() {
        closeModal()
        refetch()
        form.reset()
    }

    const { mutate, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: patching } = usePatch({ onSuccess })

    const form = useForm<Reminder>()

    function handleSubmit(vals: Reminder) {
        if (vals.id) {
            patch(url + "/" + vals.id, {
                ...vals,
                group,
            })
        } else
            mutate(url, {
                ...vals,
                group,
            })
    }

    const handleCancelEdit = () => {
        setEditingId(null)
        setEditText("")
    }

    const handleDelete = (id: number) => {
        form.setValue("id", id)
        openDelete()
    }

    return (
        <div>
            <SectionHeader
                title="Eslatmalar"
                rightComponent={
                    <Button onClick={openModal}>
                        <Plus />
                        Yangi
                    </Button>
                }
            />

            <div className="space-y-4">
                {data?.results.map((reminder) => (
                    <div
                        key={reminder.id}
                        className="border-0 shadow-sm bg-secondary backdrop-blur-sm transition-all duration-200 hover:bg-secondary/50 border-l-4 border-l-emerald-400 rounded-md"
                    >
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center  gap-3">
                                    <Badge className="bg-green-200  hover:bg-green-300 w-fit py-1">
                                        <User className="w-3 h-3 mr-1" />
                                        {reminder.author_name}
                                    </Badge>

                                    <div className="flex items-center gap-2 text-emerald-700">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm">
                                            {formatDate(reminder.created_at)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start justify-between gap-4">
                                    {editingId === reminder.id ?
                                        <div className="flex-1 flex items-start gap-2">
                                            <Textarea
                                                value={editText}
                                                onChange={(e) =>
                                                    setEditText(e.target.value)
                                                }
                                                className="flex-1 border-emerald-200 focus:border-emerald-400 w-full"
                                                // fullWidth
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleSaveEdit(
                                                            reminder.id,
                                                        )
                                                    } else if (
                                                        e.key === "Escape"
                                                    ) {
                                                        handleCancelEdit()
                                                    }
                                                }}
                                                autoFocus
                                            />
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    handleSaveEdit(reminder.id)
                                                }
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                            >
                                                <Check className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={handleCancelEdit}
                                                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    :   <>
                                            <p className="light:text-emerald-900 text-base leading-relaxed font-light flex-1">
                                                {reminder.content}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        handleEdit(reminder)
                                                    }
                                                    className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        handleDelete(
                                                            reminder.id,
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {data?.results.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-emerald-600 text-lg">
                        Hozircha eslatmalar yo'q
                    </div>
                </div>
            )}

            <Modal title="Eslatma qo'shish">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormTextarea
                        required
                        methods={form}
                        name="content"
                        label="Eslatma matni"
                    />
                    <Button
                        loading={isPending || patching}
                        className="mt-3 w-full"
                    >
                        Yaratish
                    </Button>
                </form>
            </Modal>

            <DeleteModal
                id={form.watch("id")}
                path={url}
                onSuccessAction={() => form.reset()}
            />
        </div>
    )
}
