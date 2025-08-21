import { DataTable } from "@/components/ui/datatable"
import { useGet } from "@/hooks/useGet"
import { useGroupExamsCols } from "./cols"
import { useSearch } from "@tanstack/react-router"
import { FileText } from "lucide-react"
import { moduleTypeLabel } from "./task-card"
import { truncateFileName } from "@/lib/utils"

export default function ExamDetail() {
    const { id } = useSearch({ strict: false })

    const { data: detail } = useGet<GroupModule>(
        `platform/groups/modules/${id}`,
        {
            options: {
                enabled: !!id,
            },
        },
    )

    const columns = useGroupExamsCols()

    return (
        <div>
            {detail?.files.length ?
                <div>
                    <p className="text-muted-foreground">
                        {moduleTypeLabel[detail?.type ?? "topic"]}ga tegishli
                        fayllar
                    </p>
                    <div className="flex flex-wrap mt-2 gap-2">
                        {detail?.files.map((file) => (
                            <div
                                className="bg-blue-400/10 p-2 rounded-md flex items-center gap-2 text-muted-foreground text-sm cursor-pointer hover:underline"
                                key={file.id}
                                onClick={() => window.open(file.file, "_blank")}
                            >
                                <FileText />
                                <span>{truncateFileName(file.file)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            :   ""}
            <div className="mt-3">
                <p className="text-muted-foreground">O'quvchilar</p>
                <DataTable
                    columns={columns}
                    data={detail?.students}
                    viewAll
                    className="max-w-full"
                    numeration
                    minRows={6}
                />
            </div>
        </div>
    )
}
