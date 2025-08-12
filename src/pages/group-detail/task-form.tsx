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
import { FormSwitch } from "@/components/form/switch"

export default function TaskForm() {
    const form = useForm<
        GroupExam & {
            students: {
                id: number
                full_name: string
                is_selected: boolean
                status: string
            }[]
        }
    >()
    const { data: students } = useGet<GroupStudent[]>(GROUP_STUDENTS, {
        params: { group: 5 },
        options: { queryKey: [GROUP_STUDENTS] },
    })

    const wst = form.watch("students")

    const { fields } = useFieldArray({
        control: form.control,
        name: "students",
        keyName: "key",
    })

    function handleSubmit(vals: GroupExam) {
        console.log(vals)
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
                    <FormTextarea
                        methods={form}
                        name="name"
                        label="Vazifa"
                        placeholder="Vazifani yozing"
                        required
                    />

                    <FileInput
                        control={form.control}
                        name="files"
                        maxFiles={3}
                        label="Qo'shimcha fayllar"
                    />

                    <div className="mt-3 bg-background p-3 pt-4 rounded-md">
                        <FormSwitch
                            control={form.control}
                            name="max_score"
                            label="O'quvchilar vazifalarni yuklashsin"
                        />
                    </div>
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

            <Button className="ml-auto block">Yaratish</Button>
        </form>
    )
}
