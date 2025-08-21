import { FormCheckbox } from "@/components/form/checkbox"
import { FileInput } from "@/components/form/file-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { GROUP_STUDENTS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { studentStatusKeys } from "../students/student-status"
import FormTextarea from "@/components/form/textarea"

import { usePost } from "@/hooks/usePost"
import { useParams } from "@tanstack/react-router"
import { useStore } from "@/hooks/use-store"
import { GROUP } from "@/constants/api-endpoints"
import { FormSwitch } from "@/components/form/switch"
import { FormDateTimePicker } from "@/components/form/form-datetime-picker"

type Fields = GroupModule & {
    students: {
        id: number
        full_name: string
        is_selected: boolean
        status: string
    }[]
    is_homework_required: boolean
}

export default function TaskForm({ onSuccess }: { onSuccess: () => void }) {
    const { id: group } = useParams({ from: "/_main/groups/$id/_main/tasks/" })
    const { store } = useStore<GroupModule>("item")
    const { data } = useGet<Group>(GROUP + "/" + group)

    const form = useForm<Fields>({
        defaultValues: {
            type: "task",
        },
    })

    const { mutate, isPending } = usePost(
        { onSuccess },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )

    const { data: students } = useGet<GroupStudent[]>(GROUP_STUDENTS, {
        params: { group },
    })

    const wst = form.watch("students") as GroupModuleStudent[]

    const { fields } = useFieldArray({
        control: form.control,
        name: "students",
        keyName: "key",
    })

    function handleSubmit(vals: Fields) {
        const conf = {
            ...vals,
            file_datas: vals.uploaded_files,
            uploaded_files: undefined,
            group,
            date: store?.date,
            controller: data?.teacher,
            students: vals.students
                .filter((st) => st.is_selected)
                .map((st) => st.id)
                .join(","),
        }
        mutate("platform/groups/modules", conf)
    }

    useEffect(() => {
        if (students?.length) {
            form.setValue(
                "students",
                students.map((st) => ({
                    id: st.id,
                    full_name: st.student_name,
                    is_selected: true,
                    status: studentStatusKeys[st.status],
                })),
            )
        }
    }, [students])

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mb-3 grid grid-cols-2 gap-2 bg-secondary dark:bg-card p-3 rounded-md min-h-[320px]">
                <div className="mb-3 flex flex-col gap-4">
                    <FormTextarea
                        methods={form}
                        name="title"
                        label="Vazifa"
                        placeholder="Vazifani yozing"
                        required
                    />

                    <FormDateTimePicker
                        control={form.control}
                        name="deadline"
                        required
                        label="O'lim chizig'i"
                        placeholder="Sana tanlash ixtiyoriy"
                        addButtonProps={{
                            className:
                                "!w-full !h-12 bg-secondary !flex hover:bg-secondary !justify-start",
                        }}
                    />

                    <FormTextarea
                        methods={form}
                        name="description"
                        label="Qo'shimcha izoh"
                        placeholder="Ixtiyoriy"
                    />

                    <div className="mt-3 bg-background p-3 pt-4 rounded-md">
                        <FormSwitch
                            control={form.control}
                            name="is_homework_required"
                            label="O'quvchilar vazifalarni yuklashsin"
                        />
                    </div>

                    <FileInput
                        control={form.control}
                        name="uploaded_files"
                        maxFiles={5}
                        acceptedTypes={[".pdf"]}
                        label="Qo'shimcha fayllar"
                    />
                </div>

                {
                    <div className="flex flex-col gap-2 select-none mt-3 max-h-[340px] overflow-y-auto">
                        <label className="flex gap-2 items-center px-2 cursor-pointer">
                            <Checkbox
                                checked={wst?.every((st) => st.is_selected)}
                                onCheckedChange={(v) =>
                                    form.setValue(
                                        "students",
                                        wst?.map((st) => ({
                                            ...st,
                                            is_selected: !!v,
                                        })) as any,
                                    )
                                }
                            />
                            <span>O'quvchilar</span>
                        </label>
                        {fields?.map((st, i) => (
                            <div
                                className="bg-background p-2 rounded-lg flex justify-between items-center"
                                key={st.key}
                            >
                                <FormCheckbox
                                    label={st.full_name}
                                    control={form.control}
                                    name={`students.${i}.is_selected`}
                                />
                                {st.status == "Aktiv" ?
                                    ""
                                :   <p className="lowercase text-muted-foreground text-sm">{`( ${st.status} )`}</p>
                                }
                            </div>
                        ))}
                    </div>
                }
            </div>

            <Button className="ml-auto block" loading={isPending}>
                Yaratish
            </Button>
        </form>
    )
}
