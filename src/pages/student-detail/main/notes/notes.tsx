import { useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, User, Trash2, Plus, Pen, AlarmClock } from "lucide-react"
import { useGet } from "@/hooks/useGet"
import { STUDENT_NOTES } from "@/constants/api-endpoints"
import { format } from "date-fns"
import { useParams, useSearch } from "@tanstack/react-router"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import { formatMoney } from "@/lib/format-money"
import { useStore } from "@/hooks/use-store"
import Modal from "@/components/custom/modal"
import StudentNotesCreate from "./create"

export default function StudentNotesMain() {
    const { id } = useParams({ from: "/_main/students/$id/_main/notes" })
    const search = useSearch({ from: "/_main/students/$id/_main/notes" })
    const { store: current, setStore, remove } = useStore<Notes | null>("notes")
    const { openModal } = useModal("notes-add")
    const { openModal: openDelete } = useModal("notes-delete")

    const { data } = useGet<ListResp<Notes>>(STUDENT_NOTES, {
        params: { ...search, student: id },
        options: { enabled: !!id },
    })

    const handleAddNotes = useCallback(() => {
        remove()
        openModal()
    }, [openModal])

    const handleUpdate = useCallback(
        (item: Notes) => {
            if (item?.id) {
                setStore(item)
                openModal()
            }
        },
        [openModal, setStore],
    )

    const handleDelete = useCallback(
        (item: Notes) => {
            setStore(item)
            openDelete()
        },
        [openDelete],
    )

    return (
        <div>
            <div className="flex  mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium ">
                        {"Eslatmalar ro'yxati"}
                    </h1>
                    <Badge className="text-sm">
                        {formatMoney(data?.count)}
                    </Badge>
                </div>
                <Button
                    type="button"
                    onClick={handleAddNotes}
                    className="flex gap-1"
                >
                    <Plus className="w-5 h-5" />
                    <span className="sm:block hidden">
                        {"Eslatma qo'shish"}
                    </span>
                </Button>
            </div>

            <div className="space-y-4">
                {data?.results?.map((note) => (
                    <div
                        key={note.id}
                        className="border-0 shadow-sm bg-muted backdrop-blur-sm transition-all duration-200 hover:bg-secondary/70 border-l-4 border-l-primary rounded-md"
                    >
                        <div className="p-4">
                            <div className="space-y-4">
                                <div className="flex md:flex-row flex-col justify-between gap-2 items-center">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                        <Badge className="w-fit  text-sm">
                                            <User className="w-4 h-4 mr-1" />
                                            {note.author_name}
                                        </Badge>

                                        <div className="flex items-center gap-2 text-zinc-300">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm">
                                                {format(
                                                    note.created_at,
                                                    "yyyy-MM-dd HH:mm",
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-orange-600">
                                        Eslatish vaqti:{" "}
                                        <AlarmClock className="w-4 h-4" />
                                        <span className="text-sm">
                                            {format(
                                                note.remind_at,
                                                "yyyy-MM-dd HH:mm",
                                            )}
                                        </span>
                                    </div>{" "}
                                </div>

                                <div className="flex items-end justify-between gap-4">
                                    <p className=" flex-1">{note.content}</p>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => handleUpdate(note)}
                                        >
                                            <Pen className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(note)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {data?.count === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-lg">
                        Hozircha eslatmalar yo'q
                    </div>
                </div>
            )}

            <Modal
                modalKey="notes-add"
                title={`Eslatma  ${current?.id ? "tahrirlash" : "qo'shish"}`}
            >
                <StudentNotesCreate id={id} />
            </Modal>

            <DeleteModal
                modalKey="notes-delete"
                id={current?.id}
                path={STUDENT_NOTES}
            />
        </div>
    )
}
