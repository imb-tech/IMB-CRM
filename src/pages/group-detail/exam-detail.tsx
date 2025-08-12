import { DataTable } from "@/components/ui/datatable"
import { useGet } from "@/hooks/useGet"
import { GROUP_STUDENTS } from "@/constants/api-endpoints"
import { useGroupExamsCols } from "./cols"

export default function ExamDetail() {
    const { data: students } = useGet<GroupStudent[]>(GROUP_STUDENTS, {
        params: { group: 5 },
        options: { queryKey: [GROUP_STUDENTS] },
    })

    const columns = useGroupExamsCols()

    return (
        <div>
            <DataTable
                columns={columns}
                data={students}
                viewAll
                className="max-w-full"
                numeration
            />
        </div>
    )
}
