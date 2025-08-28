import { FormCheckbox } from "@/components/form/checkbox"
import { FileInput } from "@/components/form/file-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useFieldArray, useFormContext } from "react-hook-form"
import FormTextarea from "@/components/form/textarea"

import { FormSwitch } from "@/components/form/switch"
import { FormDateTimePicker } from "@/components/form/form-datetime-picker"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

export default function TaskForm({ loading }: { loading?: boolean }) {
    const form = useFormContext<GroupModuleForm>()
    const { store } = useStore<GroupModule>("item")

    const wst = form.watch("students") as GroupModuleStudent[]

    const { fields } = useFieldArray({
        control: form.control,
        name: "students",
        keyName: "key",
    })

    const isEdit = useMemo(() => typeof store?.id === "number", [store])

    return (
        <div>
            <div
                className={cn(
                    "mb-3 grid grid-cols-2 gap-2 bg-secondary dark:bg-card p-3 rounded-md min-h-[320px]",
                    isEdit && "grid-cols-1",
                )}
            >
                <div className="mb-3 flex flex-col gap-4">
                    <FormTextarea
                        methods={form}
                        name="title"
                        label="Vazifa"
                        placeholder="Vazifani yozing"
                        className="bg-background border-none"
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
                                "!w-full !h-12 bg-secondary !flex hover:bg-background !justify-start bg-background border-none",
                        }}
                    />

                    <FormTextarea
                        methods={form}
                        name="description"
                        label="Qo'shimcha izoh"
                        placeholder="Ixtiyoriy"
                        className="bg-background border-none"
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

                {!isEdit && (
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
