import { FormCheckbox } from "@/components/form/checkbox"
import FormInput from "@/components/form/input"
import { FormMultiCombobox } from "@/components/form/multi-combobox"
import { FormSelect } from "@/components/form/select"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import SeeInView from "@/components/ui/see-in-view"
import {
    OPTION_EMPLOYEES,
    PROJECTS_TASKS,
    TASKS,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { cn } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { CirclePause, Disc, Flame, Paperclip, Plus, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { getPriorityColor } from "./task-card"
import { FormDateTimePicker } from "@/components/form/form-datetime-picker"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
    params: { id: string }
    currentId: number | undefined
    comment?: boolean
}

export default function CompleteTaskManager({
    currentId,
    params,
    comment,
}: Props) {
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

    const navigate = useNavigate()
    const search: any = useSearch({ from: "/_main/project/$id" })
    const { data: hrData, isLoading } = useGet<OptionEmployees[]>(
        OPTION_EMPLOYEES,
        {
            enabled: !!params.id,
            params: {
                project: params?.id,
            },
        },
    )

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
            deadline: "",
            remind_at: "",
            users: [],
            files: [] as { file: File; type: string }[],
            voiceNote: [],
            subtasks: [],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "subtasks",
    })

    const [isRecording, setIsRecording] = useState(false)
    const [deletedItem, setDeletedItem] = useState<number[]>([])
    const [recordingTime, setRecordingTime] = useState(0)
    const [switchBol, setSwitchBol] = useState<boolean>(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const queryClient = useQueryClient()
    const { closeModal } = useModal("task-modal")

    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost(
        {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [`${PROJECTS_TASKS}/${params?.id}`],
                })
                queryClient.invalidateQueries({
                    queryKey: [
                        OPTION_EMPLOYEES,
                        ...Object.values({
                            users__user_tasks__status__project_id: params?.id,
                        }),
                    ],
                })
                queryClient.invalidateQueries({
                    queryKey: [OPTION_EMPLOYEES],
                })

                toast.success("Muvaffaqiyatli qo'shildi")
                closeModal()
                form.reset()
                setDeletedItem([])
                navigate({
                    search: {
                        ...search,
                        task: undefined,
                    },
                })
            },
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch(
        {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: [`${PROJECTS_TASKS}/${params?.id}`],
                })

                queryClient.invalidateQueries({
                    queryKey: [
                        OPTION_EMPLOYEES,
                        ...Object.values({
                            users__user_tasks__status__project_id: params?.id,
                        }),
                    ],
                })
                queryClient.invalidateQueries({
                    queryKey: [OPTION_EMPLOYEES],
                })

                toast.success("Muvaffaqiyatli yangilandi")
                closeModal()
                form.reset()
                setDeletedItem([])
                navigate({
                    search: {
                        ...search,
                        task: undefined,
                    },
                })
            },
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )

    const onSubmit = async (data: QuoteCard) => {
        const formData = new FormData()
        const currentFiles = form.watch("files")
        const currentVoiceNotes = form.watch("voiceNote") || []

        if (currentFiles?.length) {
            currentFiles.forEach(({ file }) => {
                const isNewFile = !task?.files?.some(
                    (item) =>
                        item.file?.name === file.name &&
                        item.file?.size === file.size &&
                        item.type === getFileType(file),
                )

                if (isNewFile && typeof file !== "string") {
                    formData.append(getFileType(file), file)
                }
            })
        }
        const fetchPromises: Promise<void>[] = []

        const backendAudios =
            task?.files
                ?.filter((item) => item.type === "audio")
                ?.map((item) => item.file) || []

        currentVoiceNotes.forEach((url: string, index: number) => {
            const isNewAudio = !backendAudios.some((file: any) => {
                if (!file) return false

                return typeof file === "string" && file === url
            })

            if (isNewAudio) {
                const promise = fetch(url)
                    .then((res) => res.blob())
                    .then((blob) => {
                        formData.append("audio", blob, `voice-${index}.wav`)
                    })
                fetchPromises.push(promise)
            }
        })

        await Promise.all(fetchPromises)

        if (currentId) {
            formData.append("status", currentId.toString())
        }
        formData.append("subtasks", JSON.stringify(data.subtasks))
        formData.append("users", JSON.stringify(data.users))

        if (deletedItem?.length > 0) {
            formData.append("deleted_files", JSON.stringify(deletedItem))
        }
        if (switchBol) {
            formData.append("remind_at", data.remind_at)
        }
        const skipKeys = [
            "files",
            "subtasks",
            "voiceNote",
            "users",
            "remind_at",
            "deleted_files",
            "author",
            "order",
        ]

        for (const [key, value] of Object.entries(data)) {
            if (
                !skipKeys.includes(key) &&
                value !== null &&
                value !== undefined
            ) {
                formData.append(key, String(value))
            }
        }

        const url = task?.id ? `${TASKS}/${task.id}` : TASKS
        const mutate = task?.id ? mutateUpdate : mutateCreate
        mutate(url, formData)
    }

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder

            const audioChunks: BlobPart[] = []
            mediaRecorder.ondataavailable = (event) =>
                audioChunks.push(event.data)

            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunks, { type: "audio/wav" })
                const url = URL.createObjectURL(blob)
                const currentVoiceNotes = form.getValues("voiceNote")
                form.setValue("voiceNote", [...currentVoiceNotes, url])
                stream.getTracks().forEach((track) => track.stop())
            }

            mediaRecorder.start()
            setIsRecording(true)
            setRecordingTime(0)

            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1)
            }, 1000)
        } catch (error) {
            console.error("Mic error:", error)
        }
    }

    const stopRecording = () => {
        mediaRecorderRef.current?.stop()
        setIsRecording(false)
        clearInterval(recordingIntervalRef.current!)
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            const currentFiles = form.getValues("files") || []

            const newFiles = Array.from(files).map((file) => ({
                file,
                type: getFileType(file),
            }))

            form.setValue("files", [...currentFiles, ...newFiles])
        }
    }

    const handleDeleteFile = (item: {
        file: any
        type: string
        id?: number
    }) => {
        const currentFiles = form.watch("files")

        const deletedFile: any = currentFiles.find((f) => f.file === item.file)
        const fileId = deletedFile?.id
        const updatedFiles = currentFiles.filter((f) => f.file !== item.file)
        form.setValue("files", updatedFiles)

        if (fileId) {
            setDeletedItem((prev) => [...prev, fileId])
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    useEffect(() => {
        if (task?.id) {
            if (task.remind_at) {
                setSwitchBol(true)
            }
            form.reset({
                ...task,
                voiceNote: task.files
                    ?.filter((item) => item.type === "audio")
                    .map((item) => item.file),
                files: task.files
                    ?.filter((item) => item.type !== "audio")
                    .map((item) => item),
            })
        }
    }, [form, task, search])

    const files = form.watch("files") || []
    const images = files.filter((f) => f.type === "image")
    const otherFiles = files.filter((f) => f.type !== "image")

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
                "w-full   overflow-y-auto sm:space-y-6 space-y-4 lg:pb-[57px] pb-16    no-scrollbar-x",
                task?.is_checked && task?.is_action && "pb-0",
                comment
                    ? "pr-2 lg:pl-4 pl-2 lg:max-h-[86vh] max-h-[87vh]"
                    : "px-1 lg:max-h-[80vh] max-h-[87vh]",
            )}
        >
            <div className="space-y-3">
                {task?.author.full_name && (
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
                    disabled={task?.is_action}
                    required
                    label={"Vazifa nomi"}
                    methods={form}
                    name={"title"}
                    type="text"
                />
            </div>

            {/* Description */}
            <FormTextarea
                disabled={task?.is_action}
                methods={form}
                name="desc"
                label={"Tavsif"}
                placeholder={"Vazifa haqida"}
            />

            {/* Priority & Deadline */}
            <div className="grid sm:grid-cols-2 gap-4 ">
                <FormSelect
                    disabled={task?.is_action}
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
                        disabled: task?.is_action,
                    }}
                    calendarProps={{
                        fromDate: new Date(),
                    }}
                />
            </div>

            {/* Assigned To */}
            <div className="grid sm:grid-cols-2 gap-4 ">
                <FormDateTimePicker
                    label={
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="airplane-mode">
                                {"Ogohlantirish"}
                            </Label>
                            <Switch
                                disabled={task?.is_action}
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
                        disabled: !switchBol || task?.is_action,
                    }}
                    calendarProps={{
                        fromDate: new Date(),
                        toDate: new Date(form.watch("deadline")),
                    }}
                />
                <FormMultiCombobox
                    label={"Ma'sul xodim"}
                    control={form.control}
                    name="users"
                    labelKey="full_name"
                    valueKey="id"
                    options={hrData}
                    isLoading={isLoading}
                    addButtonProps={{
                        disabled: task?.is_action,
                    }}
                />
            </div>

            {/* Subtasks */}
            {fields.length > 0 || !task?.is_action ? (
                <div className={cn("space-y-2 border p-3 rounded-md")}>
                    <label className="text-sm">{"Kichik vazifalar"}</label>

                    {fields?.map((field, index) => {
                        const isFinished = form.watch(
                            `subtasks.${index}.finished`,
                        )
                        return (
                            <div
                                key={field.id}
                                className="flex items-center gap-2 mb-2"
                            >
                                <div className="flex items-center gap-2">
                                    {(!task?.is_checked ||
                                        !task?.is_action) && (
                                        <FormCheckbox
                                            disabled={
                                                task?.is_action &&
                                                task?.is_checked
                                            }
                                            control={form.control}
                                            name={`subtasks.${index}.finished`}
                                        />
                                    )}
                                    <span className="pb-1">{index + 1}.</span>
                                </div>
                                <FormInput
                                    disabled={task?.is_action}
                                    methods={form}
                                    name={`subtasks.${index}.title`}
                                    className={`flex-1 ${
                                        isFinished
                                            ? "line-through text-muted-foreground"
                                            : ""
                                    }`}
                                />
                                {!task?.is_action && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        className="min-w-8"
                                        onClick={() => remove(index)}
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                )}
                            </div>
                        )
                    })}

                    {!task?.is_action && (
                        <Button
                            disabled={task?.is_action}
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
                    )}

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
                                Math.round(
                                    start + ((end - start) * percent) / 100,
                                )

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
            ) : null}

            {/* Images */}
            {images.length || otherFiles.length || !task?.is_action ? (
                <div className="space-y-2 border p-3 rounded-md">
                    <div
                        className={cn(
                            "flex justify-between  items-center ",
                            images?.length && "border-b pb-2 mb-2 items-end",
                        )}
                    >
                        <label>{images?.length ? "Rasmlar" : "Fayllar"}</label>
                        {!task?.is_action && (
                            <Button
                                disabled={task?.is_action}
                                className="w-[115px]"
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Paperclip className="min-w-4 max-w-4 h-4 mr-1" />{" "}
                                {"Yuklash"}
                            </Button>
                        )}
                    </div>
                    <input
                        disabled={task?.is_action}
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    {images?.length ? (
                        <div className="grid grid-cols-3 gap-2">
                            {images.map((item, i) => (
                                <div key={i} className="relative">
                                    <SeeInView
                                        url={
                                            typeof item.file !== "string"
                                                ? URL.createObjectURL(item.file)
                                                : item.file
                                        }
                                        fullWidth
                                        className="w-full lg:h-[200px]  object-cover rounded-md border"
                                    />
                                    {!task?.is_action && (
                                        <Button
                                            disabled={task?.is_action}
                                            variant="destructive"
                                            type="button"
                                            className="bg-red-500 hover:bg-red-500/90 absolute text-white w-7 h-7 p-0 top-0 right-0 min-w-8"
                                            onClick={() =>
                                                handleDeleteFile(item)
                                            }
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : null}

                    {otherFiles?.length ? (
                        <div className="flex flex-col gap-2  mb-4">
                            {images.length ? (
                                <label className="border-b pb-2">
                                    {"Fayllar"}
                                </label>
                            ) : null}
                            {otherFiles.map((item, i) => (
                                <div
                                    key={i}
                                    className="col-span-3 flex items-center justify-between gap-3"
                                >
                                    <div className="w-full text-sm flex flex-col bg-secondary rounded-md px-3 py-[10px]">
                                        <span
                                            onClick={() => {
                                                if (!item?.file) return

                                                const link =
                                                    document.createElement("a")
                                                link.href =
                                                    typeof item.file ===
                                                    "string"
                                                        ? item.file
                                                        : item.file.url
                                                link.download =
                                                    typeof item.file ===
                                                    "string"
                                                        ? getFilenameFromMedia(
                                                              item.file,
                                                          )
                                                        : item.file.name

                                                document.body.appendChild(link)
                                                link.click()
                                                document.body.removeChild(link)
                                            }}
                                            className="line-clamp-1 break-all hover:text-primary cursor-pointer"
                                        >
                                            {i + 1}.{" "}
                                            {typeof item.file === "string"
                                                ? getFilenameFromMedia(
                                                      item.file,
                                                  )
                                                : item.file.name}
                                        </span>
                                    </div>

                                    {!task?.is_action && (
                                        <Button
                                            variant="destructive"
                                            type="button"
                                            disabled={task?.is_action}
                                            onClick={() =>
                                                handleDeleteFile(item)
                                            }
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            ) : null}

            {/* Voice Notes */}
            {form.watch("voiceNote")?.length || !task?.is_action ? (
                <div className={"border p-3 rounded-md "}>
                    <div
                        className={cn(
                            "flex justify-between items-center  ",
                            form.watch("voiceNote")?.length &&
                                "mb-4 border-b pb-2 ",
                        )}
                    >
                        <label>{"Ovozli xabarlar"}</label>
                        {!task?.is_action && (
                            <Button
                                disabled={!!task?.is_action}
                                className={isRecording ? "w-max" : "w-[115px]"}
                                type="button"
                                onClick={
                                    isRecording ? stopRecording : startRecording
                                }
                                color={isRecording ? "danger" : "default"}
                            >
                                {isRecording ? (
                                    <>
                                        <CirclePause className="min-w-5 max-w-5 h-5" />{" "}
                                        {"To'xtatish"} (
                                        {formatTime(recordingTime)})
                                    </>
                                ) : (
                                    <>
                                        <Disc className="min-w-4 max-w-4 h-4 mr-1" />{" "}
                                        {"Yozish"}
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                    {form.watch("voiceNote")?.map((note, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 mb-2 w-full "
                        >
                            <span>{i + 1}.</span>
                            <audio
                                controls
                                src={note}
                                className="w-full h-11 "
                            />
                            {!task?.is_action && (
                                <Button
                                    disabled={task?.is_action}
                                    type="button"
                                    variant="destructive"
                                    className="min-w-8"
                                    onClick={() => {
                                        const audioFiles =
                                            task?.files?.filter(
                                                (item) => item.type === "audio",
                                            ) || []

                                        const fileId = audioFiles[i]?.id

                                        if (fileId) {
                                            setDeletedItem((prev) => [
                                                ...prev,
                                                fileId,
                                            ])
                                        }

                                        form.setValue(
                                            "voiceNote",
                                            form
                                                .watch("voiceNote")
                                                .filter((_, idx) => idx !== i),
                                        )
                                    }}
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            ) : null}

            {/* Submit */}
            {(!task?.is_checked || !task?.is_action) && (
                <div
                    className={cn(
                        "flex absolute  lg:bottom-0 -bottom-1 left-0 px-3 py-2 dark:bg-zinc-900 bg-zinc-200 justify-end border-t dark:border-t-zinc-700 border-t-zinc-300 ",
                        comment
                            ? "lg:w-1/2 w-full lg:rounded-bl-md rounded-b-md"
                            : "w-full rounded-b-md",
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
            )}
        </form>
    )
}

const getFileType = (file: File): string => {
    const mimeType = file?.type
    if (mimeType?.startsWith("image/")) return "image"
    return "file"
}

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
}

const getFilenameFromMedia = (url: string) => {
    const index = url.indexOf("media/")
    return index !== -1 ? url.slice(index + "media/".length) : url
}
