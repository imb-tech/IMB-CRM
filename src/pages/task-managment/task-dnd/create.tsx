import { FormCheckbox } from "@/components/form/checkbox"
import FormInput from "@/components/form/input"
import { FormMultiCombobox } from "@/components/form/multi-combobox"
import { FormSelect } from "@/components/form/select"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import {
    PROJECTS_TASKS,
    TASKLY_COMMENT,
    TASKS,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { cn } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { Flame, Plus, X } from "lucide-react"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { getPriorityColor } from "./task-card"
import { FormDateTimePicker } from "@/components/form/form-datetime-picker"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
    params: { id: string }
    currentId: number | undefined
    users: FormValues["invited_users"]
}

const options = [
    {
        label: (
            <div className="flex items-center justify-center w-full gap-2">
                <span
                    className={cn(
                        "h-7 w-7 rounded-full flex items-center justify-center",
                        getPriorityColor(1),
                    )}
                >
                    <Flame className="w-4 h-4" />
                </span>
                <span>
                    {" "}
                    <span>{"Past"}</span>
                </span>
            </div>
        ),
        key: 1,
    },
    {
        label: (
            <div className="flex items-center justify-center w-full gap-2">
                <span
                    className={cn(
                        "h-7 w-7 rounded-full flex items-center justify-center",
                        getPriorityColor(2),
                    )}
                >
                    <Flame className="w-5 h-5" />
                </span>
                <span>
                    {" "}
                    <span>{"O'rta"}</span>
                </span>
            </div>
        ),
        key: 2,
    },
    {
        label: (
            <div className="flex items-center justify-center w-full gap-2">
                <span
                    className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center",
                        getPriorityColor(3),
                    )}
                >
                    <Flame className="w-6 h-6" />
                </span>
                <span>
                    {" "}
                    <span>{"Yuqori"}</span>
                </span>
            </div>
        ),
        key: 3,
    },
]

export default function CompleteTaskManager({
    currentId,
    params,
    users,
}: Props) {
    const navigate = useNavigate()
    const search: any = useSearch({ from: "/_main/project/$id" })

    const { data: task } = useGet<QuoteCard>(`${TASKS}/${search?.task}`, {
        options: {
            enabled: !!search?.task,
        },
    })

    const form = useForm<QuoteCard>({
        defaultValues: {
            title: "",
            desc: "",
            priority: 1,
            users: [],
            subtasks: [],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "subtasks",
    })

    const queryClient = useQueryClient()
    const { closeModal } = useModal("task-modal")

    const onSuccess = () => {
        const queryKeysToInvalidate = [
            [`${PROJECTS_TASKS}/${params?.id}`],
            [TASKLY_COMMENT],
        ]

        queryKeysToInvalidate.forEach((key) =>
            queryClient.invalidateQueries({ queryKey: key }),
        )

        toast.success(
            search?.task
                ? "Muvaffaqiyatli yangilandi"
                : "Muvaffaqiyatli qo'shildi",
        )
        closeModal()
        form.reset()
        navigate({
            search: {
                ...search,
                task: undefined,
            },
        })
    }

    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })

    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const onSubmit = async (data: QuoteCard) => {
        const formData = {
            ...data,
            status: currentId,
        }

        const url = task?.id ? `${TASKS}/${task.id}` : TASKS
        const mutate = task?.id ? mutateUpdate : mutateCreate
        mutate(url, formData)
    }

    useEffect(() => {
        if (task?.id) {
            form.reset(task)
        }
    }, [form, task])

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
                "w-full lg:w-[45%] bg-gray-200 dark:bg-zinc-900  h-[90vh]  overflow-y-auto space-y-5 p-3  pb-16    no-scrollbar-x",
            )}
        >
            <div className="space-y-3">
                {task?.author?.full_name && (
                    <div className="flex items-center gap-2 my-2">
                        <Avatar className="h-9 w-9">
                            <AvatarImage
                                src={task?.author.face || undefined}
                                alt={task?.author.full_name}
                            />
                            <AvatarFallback className={cn("uppercase")}>
                                {task?.author.full_name.slice(0, 1)}
                            </AvatarFallback>
                        </Avatar>
                        <h1>{task?.author.full_name}</h1>
                    </div>
                )}

                {/* Title */}
                <FormInput
                    required
                    label={"Vazifa nomi"}
                    methods={form}
                    name={"title"}
                    type="text"
                />
            </div>

            {/* Description */}
            <FormTextarea
                methods={form}
                name="desc"
                label={"Tavsif"}
                placeholder={"Vazifa haqida"}
                rows={4}
            />

            {/* Priority & Deadline */}
            <FormSelect
                label={"Muhimlik darajasi"}
                control={form.control}
                labelKey="label"
                valueKey="key"
                name="priority"
                options={options}
            />
            <FormDateTimePicker
                label={"Muddati"}
                placeholder={"Muddati"}
                name="deadline"
                control={form.control}
                addButtonProps={{
                    variant: "secondary",
                    className: "w-full flex justify-start",
                }}
                calendarProps={{
                    fromDate: new Date(),
                }}
            />

            {/* Assigned To */}
            {/* <div className="grid sm:grid-cols-2 gap-4 items-end "> */}
            {/* <FormDateTimePicker
                    label={
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="airplane-mode">
                                {"Ogohlantirish"}
                            </Label>
                            <Switch
                                checked={switchBol}
                                onCheckedChange={setSwitchBol}
                                id="airplane-mode"
                            />
                        </div>
                    }
                    name="remind_at"
                    control={form.control}
                    addButtonProps={{
                        variant: "secondary",
                        className: "w-full flex justify-start",
                        disabled: !switchBol,
                    }}
                    calendarProps={{
                        fromDate: new Date(),
                        toDate: new Date(form.watch("deadline")),
                    }}
                /> */}
            <FormMultiCombobox
                label={"Ma'sul xodim"}
                control={form.control}
                name="users"
                labelKey="full_name"
                valueKey="id"
                options={users}
            />
            {/* </div> */}

            {/* Subtasks */}
            <div className={cn("space-y-2 border p-3 rounded-md")}>
                <label className="text-sm">{"Kichik vazifalar"}</label>

                {fields?.map((field, index) => {
                    const isFinished = form.watch(`subtasks.${index}.finished`)
                    return (
                        <div
                            key={field.id}
                            className="flex items-center gap-2 mb-2"
                        >
                            <div className="flex items-center gap-2">
                                <FormCheckbox
                                    control={form.control}
                                    name={`subtasks.${index}.finished`}
                                />
                                <span className="pb-1">{index + 1}.</span>
                            </div>
                            <FormInput
                                methods={form}
                                name={`subtasks.${index}.title`}
                                className={`flex-1 ${
                                    isFinished
                                        ? "line-through text-muted-foreground"
                                        : ""
                                }`}
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                className="min-w-8"
                                onClick={() => remove(index)}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    )
                })}

                <Button
                    type="button"
                    className="min-w-8 w-full"
                    onClick={() =>
                        append({
                            id: Date.now(),
                            title: "",
                            finished: false,
                        })
                    }
                >
                    <Plus className="w-5 h-5" /> {"Qo'shish"}
                </Button>

                {fields.length > 0 &&
                    (() => {
                        const subtasks = form.watch("subtasks") || []
                        const finished = subtasks.filter(
                            (task: any) => task.finished,
                        ).length
                        const total = fields.length
                        const percent = Math.round((finished / total) * 100)

                        const startColor = { r: 160, g: 186, b: 116 }
                        const endColor = { r: 34, g: 197, b: 94 }

                        const interpolate = (start: number, end: number) =>
                            Math.round(start + ((end - start) * percent) / 100)

                        const r = interpolate(startColor.r, endColor.r)
                        const g = interpolate(startColor.g, endColor.g)
                        const b = interpolate(startColor.b, endColor.b)

                        const barColor = `rgb(${r}, ${g}, ${b})`

                        return (
                            <div className="space-y-1">
                                <div className="w-full h-1.5 bg-gray-200 rounded overflow-hidden">
                                    <div
                                        className="h-full transition-all duration-500 ease-in-out"
                                        style={{
                                            width: `${percent}%`,
                                            backgroundColor: barColor,
                                        }}
                                    />
                                </div>
                                <div className="text-xs text-muted-foreground text-right">
                                    {"Bajarilgan:"} {percent}%
                                </div>
                            </div>
                        )
                    })()}
            </div>

            {/* Submit */}
            <div
                className={cn(
                    "flex absolute  bottom-0  left-0 px-3 py-2 dark:bg-zinc-900 bg-zinc-200 justify-end border-t dark:border-t-zinc-700 border-t-zinc-300 lg:rounded-bl-md  lg:w-[45%] w-full  ",
                )}
            >
                <Button
                    disabled={isPendingCreate || isPendingUpdate}
                    loading={isPendingCreate || isPendingUpdate}
                    type="submit"
                    className="sm:w-[115px] w-full"
                >
                    {"Saqlash"}
                </Button>
            </div>
        </form>
    )
}
