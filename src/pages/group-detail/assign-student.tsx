import { FormCombobox } from "@/components/form/combobox"
import { Button } from "@/components/ui/button"
import { GROUP_STUDENTS, OPTION_STUDENT } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePost } from "@/hooks/usePost"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { useForm } from "react-hook-form"

type Fields = {
    student: number
    module: number
}

export default function AssignStudent({ module }: { module?: string }) {
    const [search, setSearch] = useState<string>("")
    const { closeModal } = useModal("append-student")
    const { id: group } = useParams({ from: "/_main/groups/$id/_main/tasks/" })

    const { data } = useGet<GroupStudent[]>(GROUP_STUDENTS, {
        params: { search, group, exclude_module: module },
    })

    const { mutate, isPending } = usePost({
        onSuccess() {
            closeModal()
        },
    })

    const form = useForm<Fields>()

    function onSubmit(v: Fields) {
        const payload = {
            is_scored: false,
            module,
            group_student: v.student,
        }

        mutate("platform/group-students/crud/modules", payload)
    }

    return (
        <form
            className="flex flex-col gap-2 pt-4"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <FormCombobox
                key={form.formState.errors.student?.message}
                control={form.control}
                name="student"
                options={data}
                labelKey="student_name"
                onSearchChange={(v) => setSearch(v)}
                valueKey="id"
                placeholder="O'quvchini tanlang"
                required
                renderOption={(item) => (
                    <div className="p-2 flex items-center justify-between w-full">
                        <p>{item.student_name}</p>
                        <p>{item.student_phone}</p>
                    </div>
                )}
            />

            <Button className="w-full" loading={isPending} autoFocus>
                Qo'shish
            </Button>
        </form>
    )
}
