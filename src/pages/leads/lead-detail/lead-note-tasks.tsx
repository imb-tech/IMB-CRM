import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect, useMemo } from "react"
import {
    ArrowDown,
    ArrowRight,
    Calendar,
    CheckCheck,
    Clock9,
    NotepadText,
    Trash2,
} from "lucide-react"
import ParamInput from "@/components/as-params/input"
import { useForm } from "react-hook-form"
import { FormCombobox } from "@/components/form/combobox"
import FormTextarea from "@/components/form/textarea"
import { FormDateTimePicker } from "@/components/form/form-datetime-picker"
import { useGet } from "@/hooks/useGet"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import { usePost } from "@/hooks/usePost"
import { formatDateChat, groupMessagesByDate } from "../utils"
import { format } from "date-fns"
import { useQueryClient } from "@tanstack/react-query"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { FormSelect } from "@/components/form/select"
import { HR_API, TASKLY_PROJECT_CRM } from "@/constants/api-endpoints"
import { cn } from "@/lib/utils"
import { FormMultiCombobox } from "@/components/form/multi-combobox"

export default function LeadNotes() {
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const { openModal } = useModal("delete-note")
    const [item, setItem] = useState<LeadNote | null>(null)
    const navigate = useNavigate()
    const { search } = useSearch({ strict: false })

    const { data: projects } = useGet<FormValues[]>(TASKLY_PROJECT_CRM)

    const { data: employees, isFetching } = useGet<ListResp<any>>(HR_API, {
        params: { search },
    })

    const { user } = useParams({ from: "/_main/leads/$id/user/$user" })

    const queryClient = useQueryClient()
    const queryKey = [`leads/notes-list/${user}`]

    const { data } = useGet<LeadNote[]>(`leads/notes-list/${user}`)

    const { data: tasks } = useGet<LeadNote[]>(`leads/tasks/list/${user}`)

    const { data: logs } = useGet<LeadNote[]>(`leads/log/${user}`)

    const mixData = useMemo(() => {
        return [...(data ?? []), ...(logs ?? []), ...(tasks ?? [])]?.sort(
            (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime(),
        )
    }, [logs, data, tasks])

    const { mutate, isPending } = usePost()

    const form = useForm<LeadNote>({
        defaultValues: {
            type: "note",
        },
    })

    const values = form.watch()

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }

    const groupedMessages = groupMessagesByDate(mixData ?? [])
    const sortedDates = Object.keys(groupedMessages).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    )

    // Yangi xabar qo'shilganda pastga scroll qilish
    useEffect(() => {
        scrollToBottom()
    }, [sortedDates])

    const handleSubmit = (vals: LeadNote) => {
        if (vals.note.trim()) {
            const curr = queryClient.getQueryData<LeadNote[]>(queryKey) ?? []
            if (vals.type === "note") {
                mutate(
                    "leads/notes",
                    {
                        lead: user,
                        note: vals.note,
                    },
                    {
                        onSuccess(d: LeadNote) {
                            form.reset()
                            const nd = [...curr, d]
                            queryClient.setQueryData(queryKey, nd)
                            setTimeout(() => {
                                scrollToBottom()
                            }, 300)
                        },
                    },
                )
            } else {
                const currTasks =
                    queryClient.getQueryData<LeadNote[]>([
                        `leads/tasks/list/${user}`,
                    ]) ?? []
                mutate(
                    "leads/tasks/create",
                    {
                        lead: user,
                        title: vals.note,
                        users: vals.users,
                        deadline: vals.created_at,
                        project: vals.project,
                    }, 
                    {
                        onSuccess(d: LeadNote) {
                            form.reset()
                            const nd = [...currTasks, d]
                            queryClient.setQueryData(
                                [`leads/tasks/list/${user}`],
                                nd,
                            )
                            setTimeout(() => {
                                scrollToBottom()
                            }, 300)
                        },
                    },
                )
            }
        }
    }

    function successDeleted() {
        const curr = queryClient.getQueryData<LeadNote[]>(queryKey) ?? []
        queryClient.setQueryData(
            queryKey,
            curr?.filter((n) => n.id !== item?.id),
        )
        setItem(null)
    }

    return (
        <Card className="h-[700px] flex flex-col border-none">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 w-full">
                    <ParamInput
                        className="border-none min-w-full rounded-b-none"
                        placeholder={"Eslatmalar orasidan qidirish"}
                        fullWidth
                    />
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden">
                <div
                    className="h-full overflow-y-auto scroll-smooth p-4 relative"
                    ref={scrollAreaRef}
                >
                    <div className="space-y-4 h-full">
                        {sortedDates?.length ? (
                            sortedDates?.map((date) => (
                                <div key={date}>
                                    <div className="hidden items-center justify-center my-4">
                                        <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                                            {formatDateChat(date)}
                                        </div>
                                    </div>

                                    <div className="sticky top-0 z-10 flex justify-center">
                                        <span className="py-1 px-2 text-center text-xs font-medium bg-primary/10 backdrop-blur rounded-full">
                                            {formatDateChat(date)}
                                        </span>
                                    </div>

                                    <div className="space-y-2 pt-3 px-5">
                                        {groupedMessages[date].map((message) =>
                                            message?.note ? (
                                                <div
                                                    key={message.id + date}
                                                    className={`flex justify-start [&_button]:hover:opacity-100`}
                                                >
                                                    <div
                                                        className={`w-full rounded-none px-4 py-3 transition-all duration-200 flex items-start gap-3 bg-secondary`}
                                                    >
                                                        <span className="flex items-center justify-center w-9 h-9 border border-primary/50 text-primary/50 rounded-full">
                                                            <NotepadText />
                                                        </span>
                                                        <div className="flex-1">
                                                            <p
                                                                className={`text-xs mb-1 text-muted-foreground`}
                                                            >
                                                                {format(
                                                                    message.created_at,
                                                                    "HH:mm",
                                                                )}{" "}
                                                                -{" "}
                                                                {
                                                                    message.author_name
                                                                }
                                                            </p>
                                                            <p className="text-sm max-w-[80%] flex flex-col gap-1">
                                                                {message.note
                                                                    ?.split(
                                                                        "\n",
                                                                    )
                                                                    .map(
                                                                        (
                                                                            line,
                                                                            i,
                                                                        ) =>
                                                                            line ? (
                                                                                <span
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        line
                                                                                    }
                                                                                    <br />
                                                                                </span>
                                                                            ) : null,
                                                                    )}
                                                            </p>
                                                        </div>
                                                        <button
                                                            className="h-full opacity-0 items-center"
                                                            onClick={() => {
                                                                setItem(message)
                                                                openModal()
                                                            }}
                                                        >
                                                            <Trash2
                                                                className="text-rose-500/70"
                                                                size={22}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : message?.title ? (
                                                <div
                                                    key={message.id + date}
                                                    className={`flex justify-start [&_button]:hover:opacity-100`}
                                                >
                                                    <div
                                                        className={`w-full rounded-none px-4 py-3 transition-all duration-200 flex items-start gap-3 bg-secondary`}
                                                    >
                                                        <span
                                                            className={cn(
                                                                "flex items-center justify-center w-9 h-9 border border-orange-500/50 text-orange-500/50 rounded-full",
                                                                message.status__name ===
                                                                    "Finished"
                                                                    ? "border-green-500/50 text-green-500/50"
                                                                    : "",
                                                            )}
                                                        >
                                                            {message.status__name ===
                                                            "Finished" ? (
                                                                <CheckCheck />
                                                            ) : (
                                                                <Clock9 />
                                                            )}
                                                        </span>
                                                        <div className="flex-1">
                                                            <p
                                                                className={`text-xs mb-1 text-muted-foreground`}
                                                            >
                                                                {format(
                                                                    message.created_at,
                                                                    "HH:mm",
                                                                )}{" "}
                                                                -{" "}
                                                                {
                                                                    message.full_name
                                                                }
                                                            </p>
                                                            <div className="flex items-center w-full justify-between">
                                                                <p
                                                                    className={cn(
                                                                        "text-sm max-w-[80%]",
                                                                        message.status__name ===
                                                                            "Finished"
                                                                            ? "line-through text-green-500"
                                                                            : "",
                                                                    )}
                                                                >
                                                                    {
                                                                        message.title
                                                                    }
                                                                </p>
                                                                <span className=" rounded-[2px] px-2 mr-3 text-sm text-muted-foreground flex items-center gap-1">
                                                                    <Calendar
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                    {format(
                                                                        message?.deadline,
                                                                        "HH:mm dd.MM.yyyy",
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : message?.body ? (
                                                <div
                                                    key={message.id}
                                                    className={`flex text-xs gap-2 font-extralight py-1`}
                                                >
                                                    {message?.old_status ? (
                                                        <div className="flex items-center">
                                                            <div className="hidden md:block min-w-[160px]"></div>
                                                            <span>
                                                                {format(
                                                                    message.created_at,
                                                                    "HH:mm",
                                                                )}
                                                            </span>
                                                            <span className="rounded-[2px] px-2">
                                                                {
                                                                    message?.author_name
                                                                }
                                                            </span>
                                                            <span className="bg-gray-500 rounded-[2px] px-2">
                                                                {
                                                                    message?.old_status
                                                                }
                                                            </span>
                                                            <ArrowRight
                                                                className="mx-2"
                                                                size={14}
                                                            />
                                                            <span className="bg-emerald-500/50 rounded-[2px] px-2">
                                                                {message?.new_status ??
                                                                    ""}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center">
                                                            <div className="hidden md:block min-w-[160px]"></div>
                                                            <span className="rounded-[2px]">
                                                                {message?.body}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : null,
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-muted-foreground">
                                    {"Eslatmalar yo'q"}
                                </p>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <Button
                    onClick={scrollToBottom}
                    className="absolute bottom-4 right-4 h-10 w-10 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 transform hover:scale-105 z-10 hidden"
                    size="icon"
                >
                    <ArrowDown className="h-4 w-4" />
                </Button>
            </div>

            <DeleteModal
                id={item?.id}
                modalKey="delete-note"
                path="leads/notes"
                disableRefetch
                onSuccessAction={successDeleted}
            />

            <div className="p-4 flex items-start">
                <div className="flex items-start space-x-2 w-full">
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="flex flex-col gap-2 w-full"
                    >
                        <FormTextarea
                            methods={form}
                            name="note"
                            placeholder={
                                values.type === "note"
                                    ? "Eslatma yozing"
                                    : "Vazifa haqida batafsil yozing"
                            }
                            className="flex-1"
                        />

                        <div className="grid grid-cols-3 gap-2 flex-wrap">
                            <FormSelect
                                options={[
                                    {
                                        value: "note",
                                        label: "Eslatma",
                                    },
                                    {
                                        value: "task",
                                        label: "Vazifa",
                                    },
                                ]}
                                control={form.control}
                                name="type"
                            />
                            {values.type == "task" && (
                                <FormCombobox
                                    control={form.control}
                                    required
                                    name="project"
                                    valueKey="id"
                                    labelKey="name"
                                    placeholder={"Loyixa"}
                                    options={projects}
                                />
                            )}
                            {values.type == "task" && (
                                <FormMultiCombobox
                                    control={form.control}
                                    required
                                    name="users"
                                    onSearchChange={(v) =>
                                        navigate({
                                            to: window.location.pathname,
                                            search: {
                                                search: v,
                                            },
                                        })
                                    }
                                    valueKey="id"
                                    labelKey="full_name"
                                    isLoading={isFetching}
                                    placeholder={"Kim uchun"}
                                    options={employees?.results ?? []}
                                    addButtonProps={{
                                        disabled: !values.project,
                                        className:
                                            "min-w-[200px] w-full justify-start",
                                        variant: "secondary",
                                    }}
                                />
                            )}
                            {values.type == "task" &&
                                !!values.users?.length && (
                                    <FormDateTimePicker
                                        required
                                        control={form.control}
                                        name="created_at"
                                        disabled={!values.users?.length}
                                        placeholder={"Muddat"}
                                        addButtonProps={{
                                            className: "!h-10",
                                            variant: "secondary",
                                        }}
                                    />
                                )}
                            <div className="w-full flex justify-end">
                                <Button
                                    className="w-full bg-blue-500 text-white hover:bg-blue-600"
                                    type="submit"
                                    size="lg"
                                    loading={isPending}
                                >
                                    {"Qo'shish"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Card>
    )
}
