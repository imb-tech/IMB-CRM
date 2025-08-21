import { FormCheckbox } from "@/components/form/checkbox"
import { FileInput } from "@/components/form/file-input"
import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { GROUP_STUDENTS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { studentStatusKeys } from "../students/student-status"

import { usePost } from "@/hooks/usePost"
import { useParams } from "@tanstack/react-router"
import { useStore } from "@/hooks/use-store"
import { GROUP } from "@/constants/api-endpoints"
import { FormDateTimePicker } from "@/components/form/form-datetime-picker"
import { FormDatePicker } from "@/components/form/date-picker"
import FormTimeInput from "@/components/form/time-input"

type Fields = GroupModule & {
    select_all: boolean
}

export default function ExamForm({ onSuccess }: { onSuccess: () => void }) {
    const { id: group } = useParams({ from: "/_main/groups/$id/_main/tasks/" })
    const { store } = useStore<GroupModule>("item")
    const { data } = useGet<Group>(GROUP + "/" + group)

    const form = useForm<Fields>({
        defaultValues: {
            type: "exam",
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

    const wst = form.watch("students")

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
                <div className="mb-3 flex flex-col gap-2">
                    <FormInput
                        methods={form}
                        name="title"
                        label="Imtixon nomi"
                        placeholder="Misol: 1-oy bitiruv"
                        required
                    />

                    <FormDateTimePicker
                        control={form.control}
                        name="deadline"
                        label="Imtixon sanasi"
                        addButtonProps={{
                            className: "bg-secondary",
                        }}
                    />

                    <FormNumberInput
                        control={form.control}
                        name="min_score"
                        label="O'tish bal"
                        placeholder="0"
                    />
                    <FormNumberInput
                        control={form.control}
                        name="max_score"
                        label="Yuqori bal"
                        placeholder="100"
                    />
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
                                        })),
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
                                    label={st?.full_name ?? ""}
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
