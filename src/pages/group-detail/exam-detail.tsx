import { DataTable } from "@/components/ui/datatable"
import { useGet } from "@/hooks/useGet"
import { GROUP_STUDENTS } from "@/constants/api-endpoints"
import { useGroupExamsCols } from "./cols"
import { useForm } from "react-hook-form"
import FormInput from "@/components/form/input"
import { FormDatePicker } from "@/components/form/date-picker"
import { FormNumberInput } from "@/components/form/number-input"

export default function ExamDetail() {
    const { data: students } = useGet<ListResp<GroupStudent>>(GROUP_STUDENTS, {
        params: { group: 5 },
        options: { queryKey: [GROUP_STUDENTS] },
    })
    const form = useForm<GroupExam>()

    const columns = useGroupExamsCols()

    return (
        <form className="p-2">
            <div className="mb-2 grid grid-cols-2 gap-2">
                <FormInput
                    methods={form}
                    name="name"
                    label="Imtixon nomi"
                    placeholder="Misol: 1-oy bitiruv"
                    required
                />
                <FormDatePicker
                    control={form.control}
                    name="take_date"
                    label="Imtixon sanasi"
                    required
                    placeholder="Tanlang"
                />
                <FormNumberInput
                    control={form.control}
                    name="min_score"
                    label="O'tish bal"
                    placeholder="- ∞"
                />
                <FormNumberInput
                    control={form.control}
                    name="max_score"
                    label="Yuqori bal"
                    placeholder="∞ +"
                />
            </div>
            <DataTable
                columns={columns}
                data={students?.results}
                viewAll
                className="max-w-full"
                numeration
            />
        </form>
    )
}
