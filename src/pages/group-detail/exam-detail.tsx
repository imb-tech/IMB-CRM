import { DataTable } from "@/components/ui/datatable"
import { useGet } from "@/hooks/useGet"
import { useGroupExamsCols } from "./cols"
import { useSearch } from "@tanstack/react-router"
import { Trash2 } from "lucide-react"
import { moduleTypeLabel } from "./task-card"
import { truncateFileName } from "@/lib/utils"
import DeleteModal from "@/components/custom/delete-modal"
import { useState } from "react"
import { useModal } from "@/hooks/useModal"
import { Button } from "@/components/ui/button"
import AssignStudent from "./assign-student"
import Modal from "@/components/custom/modal"
import { usePatch } from "@/hooks/usePatch"
import { useQueryClient } from "@tanstack/react-query"

export default function ExamDetail() {
    const { id } = useSearch({ strict: false })
    const { openModal } = useModal("delete-file")
    const [item, setItem] = useState<{ id: number; file?: string } | null>(null)
    const { openModal: assign } = useModal("append-student")
    const { openModal: rs } = useModal("remove-student")
    const qc = useQueryClient()

    const [answer, setAnswer] = useState<string>("")
    const { openModal: openAnwser } = useModal("answer")

    const queryKey = [`platform/groups/modules/${id}`]
    const { data: detail, refetch } = useGet<GroupModule>(
        `platform/groups/modules/${id}`,
        {
            options: {
                enabled: !!id,
            },
        },
    )
    const { mutate } = usePatch()

    function clickAnswer(text: string) {
        openAnwser()
        setAnswer(text)
    }

    function updateScore(id: number, score: string) {
        const data = qc.getQueryData(queryKey)
        mutate(
            `platform/group-students/modules/${id}`,
            {
                score: Number(score),
                is_scored: score !== "",
            },
            {
                onError() {
                    qc.setQueryData(queryKey, data)
                },
            },
        )
    }

    const columns = useGroupExamsCols(clickAnswer, updateScore)

    return (
        <div className="-mt-10">
            {detail?.type !== "topic" && (
                <div className="mb-5">
                    <div className="flex items-center justify-between pb-2">
                        <p className="text-lg hidden md:block md:text-2xl font-light">
                            O'quvchilar
                        </p>
                        <Button size="sm" onClick={assign} className="hidden">
                            Qo'shish
                        </Button>
                    </div>
                    <DataTable
                        columns={columns}
                        data={detail?.students}
                        viewAll
                        className="max-w-full"
                        numeration
                        minRows={6}
                        onDelete={({ original }) => {
                            rs()
                            setItem({
                                id: original.id,
                                file: original.full_name,
                            })
                        }}
                    />
                </div>
            )}

            {detail?.files.length ?
                <div className="p-3 bg-secondary/50 rounded-md">
                    <p className="text-muted-foreground text-xl">
                        {moduleTypeLabel[detail?.type ?? "topic"]}ga tegishli
                        fayllar
                    </p>
                    <div className="flex flex-wrap mt-4 gap-2">
                        {detail?.files.map((file) => (
                            <div
                                className="bg-blue-400/10 p-2 px-3 rounded-md flex items-center gap-2 text-muted-foreground text-sm cursor-pointer hover:underline"
                                key={file.id}
                            >
                                <button
                                    onClick={() =>
                                        window.open(file.file, "_blank")
                                    }
                                    className="flex items-center gap-1"
                                >
                                    <span>{truncateFileName(file.file)}</span>
                                </button>
                                <Trash2
                                    className="text-rose-500/70"
                                    size={18}
                                    onClick={() => {
                                        openModal()
                                        setItem(file)
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                : ""}

            <Modal modalKey="append-student" title="O'quvchi qo'shish">
                {id && <AssignStudent module={id} />}
            </Modal>

            <Modal modalKey="answer" title="O'quvchi vazifasi" size="max-w-5xl">
                <p>{answer}</p>
            </Modal>

            <DeleteModal
                modalKey="delete-file"
                name={truncateFileName(item?.file ?? "")}
                id={item?.id}
                path="platform/groups/crud/module-files"
                disableRefetch
                onSuccessAction={refetch}
            />

            <DeleteModal
                modalKey="remove-student"
                id={item?.id}
                name={item?.file}
                path="platform/group-students/modules"
                disableRefetch
                onSuccessAction={refetch}
            />
        </div>
    )
}
