import { FormCheckbox } from "@/components/form/checkbox"
import { FileInput } from "@/components/form/file-input"
import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useFieldArray, useFormContext } from "react-hook-form"

import { FormDateTimePicker } from "@/components/form/form-datetime-picker"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

export default function ExamForm({ loading }: { loading?: boolean }) {
    const form = useFormContext<GroupModuleForm>()
    const { store } = useStore<GroupModule>("item")

    const wst = form.watch("students")

    const isEdit = useMemo(() => typeof store?.id === "number", [store])

    const { fields } = useFieldArray({
        control: form.control,
        name: "students",
        keyName: "key",
    })

    return (
        <div>
            <div
                className={cn(
                    "mb-3 grid grid-cols-2 gap-2 bg-secondary dark:bg-card p-3 rounded-md min-h-[320px]",
                    isEdit && "grid-cols-1",
                )}
            >
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
                            className: "bg-secondary text-start justify-start",
                        }}
                        required
                        calendarProps={{
                            fromDate: new Date()
                        }}
                    />

                    <FormNumberInput
                        control={form.control}
                        name="min_score"
                        label="O'tish bal"
                        placeholder="0"
                        required
                    />
                    <FormNumberInput
                        control={form.control}
                        name="max_score"
                        label="Yuqori bal"
                        placeholder="100"
                        required
                    />
                    <FileInput
                        control={form.control}
                        name="uploaded_files"
                        maxFiles={5}
                        acceptedTypes={[".pdf"]}
                        label="Qo'shimcha fayllar"
                    />
                </div>

                {!isEdit && (
                    <div className="flex flex-col gap-2 select-none mt-3 max-h-[340px] overflow-y-auto">
                        <label className="flex gap-2 items-center px-2 cursor-pointer">
                            <Checkbox
                                checked={wst?.every((st) => st.is_selected)}
                                onCheckedChange={(v) =>
                                    form.setValue(
                                        "students",
                                        wst?.map((st) => ({
                                            id: st.id,
                                            full_name: String(st.full_name),
                                            is_selected: Boolean(v),
                                            status: String(st.status),
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
                                    : <p className="lowercase text-muted-foreground text-sm">{`( ${st.status} )`}</p>
                                }
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Button className="ml-auto block" loading={loading}>
                Yaratish
            </Button>
        </div>
    )
}
