import { DataTable } from "@/components/ui/datatable"
import { useGet } from "@/hooks/useGet"
import { GROUP_STUDENTS } from "@/constants/api-endpoints"
import { useGroupExamsCols } from "./cols"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useSearch } from "@tanstack/react-router"
import { FileText } from "lucide-react"

const data = ["Mavzu", "Vazifa", "Imtixon"]
const files = [
    "Illustration.svg (0.1 MB)",
    "people (1).png (0.0 MB)",
    "people.png (0.0 MB)",
]

export default function ExamDetail() {
    const { data: students } = useGet<GroupStudent[]>(GROUP_STUDENTS, {
        params: { group: 5 },
        options: { queryKey: [GROUP_STUDENTS] },
    })
    const { id } = useSearch({ strict: false })

    const columns = useGroupExamsCols()

    return (
        <div>
            <div>
                <p className="text-muted-foreground">
                    {data[Number(id)]}ga tegishli fayllar
                </p>
                <div className="flex mt-2 gap-2">
                    {files?.slice(0, 3 - Number(id)).map((file) => (
                        <div
                            className="bg-blue-400/10 p-2 rounded-md flex items-center gap-2 text-muted-foreground text-sm hover:text-slate-200 cursor-pointer hover:underline"
                            key={file}
                        >
                            <FileText />
                            <span>{file}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-3">
                <p className="text-muted-foreground">O'quvchilar</p>
                <Tabs value={id?.toString()}>
                    <TabsContent value="0">
                        <DataTable
                            columns={columns}
                            data={students}
                            viewAll
                            className="max-w-full"
                            numeration
                        />
                    </TabsContent>
                    <TabsContent value="1">
                        <DataTable
                            columns={columns}
                            data={[]}
                            viewAll
                            className="max-w-full"
                            numeration
                        />
                    </TabsContent>
                    <TabsContent value="2">
                        <DataTable
                            columns={columns}
                            data={students}
                            viewAll
                            className="max-w-full"
                            numeration
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
