import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
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

type Fields = {
    student: number
    group: number
    start_date: string
}

export default function AppendStudent({
    onSuccess,
}: {
    onSuccess: () => void
}) {
    const { id } = useParams({ strict: false })
    const [search, setSearch] = useState<string>("")
    const { closeModal } = useModal("append-student")

    const qC = useQueryClient()

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

            <FormDatePicker
                control={form.control}
                name="start_date"
                placeholder="Qo'shilish sanasi"
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
