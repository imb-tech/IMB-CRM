import { FormCheckbox } from "@/components/form/checkbox"
import { FormDatePicker } from "@/components/form/date-picker"
import FormInput from "@/components/form/input"
import { FormSelect } from "@/components/form/select"
import { Button } from "@/components/ui/button"
import {
    GROUP,
    OPTION_COURSES,
    OPTION_ROOMS,
    OPTION_TEACHERS,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import useMe from "@/hooks/useMe"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { cn, weekdays } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    item: Group | null
}

const GroupCreate = ({ item }: Props) => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${GROUP}-add`)

    const { active_branch } = useMe()

    const { data: courses } = useGet<Options[]>(OPTION_COURSES)
    const { data: teachers } = useGet<Options[]>(OPTION_TEACHERS)
    const { data: rooms } = useGet<Options[]>(OPTION_ROOMS)

    const form = useForm<GroupFields>({
        defaultValues: {
            ...item,
            shifts: Array(7)
                .fill(0)
                ?.map((_, i) => {
                    if (!item?.id) {
                        return {
                            start_time: "09:00",
                            end_time: "11:30",
                            day_of_week: i + 1,
                            enable: i < 5 && i % 2 == 0,
                        }
                    }
                    const day = item?.shifts?.find(
                        (el) => el.day_of_week - 1 == i,
                    )
                    return {
                        id: day?.id ?? undefined,
                        start_time: day?.start_time ?? undefined,
                        end_time: day?.end_time ?? undefined,
                        day_of_week: i + 1,
                        enable: !!day?.id,
                    }
                }),
        },
    })

    const { fields } = useFieldArray({
        control: form.control,
        name: "shifts",
        keyName: "key",
    })

    const watchedShifts = form.watch("shifts")

    function onSuccess() {
        toast.success("Muvaffaqiyatli yangilandi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: [GROUP] })
    }

    const { mutate, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isPatching } = usePatch({ onSuccess })

    const disabled = isPending || isPatching

    const onSubmit = (values: GroupFields) => {
        const nv = {
            ...values,
            branch: active_branch,
            shifts: values.shifts?.filter((c) => c.enable),
        }
        if (item?.id) {
            patch(`${GROUP}/${item.id}`, nv)
        } else {
            mutate(GROUP, nv)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                    <FormInput
                        label="Nomi"
                        placeholder="Misol: Matematika 09"
                        methods={form}
                        name="name"
                        required
                        hideError
                    />

                    <FormSelect
                        options={courses ?? []}
                        control={form.control}
                        required
                        labelKey="name"
                        valueKey="id"
                        name="course"
                        label="Kurs"
                        hideError
                    />

                    <FormSelect
                        options={teachers ?? []}
                        control={form.control}
                        required
                        labelKey="full_name"
                        valueKey="id"
                        name="teacher"
                        label="O'qituvchi"
                        hideError
                    />

                    <FormSelect
                        options={rooms ?? []}
                        control={form.control}
                        required
                        name="room"
                        labelKey="name"
                        valueKey="id"
                        label="Xona"
                        hideError
                    />

                    <div className="grid grid-cols-2 gap-2">
                        <FormDatePicker
                            control={form.control}
                            name="start_date"
                            label="Boshlanish sanasi"
                            className="md:w-auto"
                            hideError
                            required
                        />

                        <FormDatePicker
                            control={form.control}
                            name="end_date"
                            label="Tugash sanasi"
                            className="md:w-auto"
                            hideError
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-3">
                    {fields.map((day, i) => (
                        <div
                            className={cn(
                                "flex gap-3 bg-secondary items-center py-1 px-3 rounded-md",
                                watchedShifts[i].enable ? "bg-primary/20" : "",
                            )}
                            key={day.key}
                        >
                            <div className="flex-1 items-center">
                                <FormCheckbox
                                    label={weekdays[i]}
                                    control={form.control}
                                    name={`shifts.${i}.enable`}
                                />
                            </div>
                            <FormInput
                                methods={form}
                                name={`shifts.${i}.start_time`}
                                type="time"
                                className="border-none h-8"
                                wrapperClassName="w-auto"
                                step={900}
                                required={watchedShifts[i].enable}
                                hideError
                            />
                            <FormInput
                                methods={form}
                                name={`shifts.${i}.end_time`}
                                type="time"
                                className="border-none h-8"
                                wrapperClassName="w-auto"
                                step={900}
                                required={watchedShifts[i].enable}
                                hideError
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="md:col-span-2 flex  justify-end">
                <Button
                    className="md:w-max w-full"
                    type="submit"
                    disabled={disabled}
                    loading={disabled}
                >
                    Saqlash
                </Button>
            </div>
        </form>
    )
}

export default GroupCreate
