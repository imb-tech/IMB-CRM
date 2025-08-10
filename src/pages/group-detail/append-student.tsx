import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import { FormSelect } from "@/components/form/select"
import { Button } from "@/components/ui/button"
import { GROUP_STUDENTS, STUDENT } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { format } from "date-fns"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { studentStatusKeys } from "../students/student-status"

type Fields = {
    student: number
    group: number
    start_date: string
    status: string
}

export default function AppendStudent({
    onSuccess,
}: {
    onSuccess: () => void
}) {
    const { id } = useParams({ strict: false })
    const [search, setSearch] = useState<string>("")
    const { closeModal } = useModal("append-student")

    const { data } = useGet<ListResp<Student>>(STUDENT, {
        params: { search },
    })
    const { mutate, isPending } = usePost({
        onSuccess() {
            onSuccess()
            closeModal()
        },
    })

    const form = useForm<Fields>({
        defaultValues: {
            group: Number(id),
            start_date: format(new Date().toISOString(), "yyyy-MM-dd"),
            status: "1",
        },
    })

    function onSubmit(v: Fields) {
        mutate(GROUP_STUDENTS, v)
    }

    return (
        <form
            className="flex flex-col gap-3 p-3"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <FormCombobox
                control={form.control}
                name="student"
                options={data?.results}
                labelKey="full_name"
                onSearchChange={(v) => setSearch(v)}
                valueKey="id"
                placeholder="O'quvchini tanlang"
                required
            />

            <FormSelect
                options={Object.entries(studentStatusKeys)?.map(
                    ([id, name]) => ({ id, name }),
                )}
                control={form.control}
                name="status"
                labelKey="name"
                valueKey="id"
                className="bg-background"
                label="Holati"
                required
            />

            <FormDatePicker
                control={form.control}
                name="start_date"
                label="Qo'shilish sanasi"
                className="!w-full"
                required
                fullWidth
            />

            <Button className="w-full" loading={isPending}>
                Qo'shish
            </Button>
        </form>
    )
}
