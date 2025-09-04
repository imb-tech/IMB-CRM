import { useEffect, useState } from "react"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { FormProvider, useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import {
    PROJECTS_TASKS,
    STATUSES,
    TASKLY_COMMENT,
    TASKS,
} from "@/constants/api-endpoints"
import { toast } from "sonner"

import TaskHeader from "./task-dnd/task-header"
import TaskDnd from "./task-dnd/task-dnd"
import CompleteTaskManager from "./task-dnd/create"
import TaskChat from "./chats"
import DeleteModal from "@/components/custom/delete-modal"
import Modal from "@/components/custom/modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useModal } from "@/hooks/useModal"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/hooks/useGet"
import { usePost } from "@/hooks/usePost"
import { usePatch } from "@/hooks/usePatch"
import { useTaskDndHandlers } from "./task-dnd/useTaskDndhandlers"
import { useIsMobile } from "@/hooks/use-mobile"

interface TaskModalContentProps {
    activeTab: string
    setActiveTab: (val: string) => void
    closeTaskModal: () => void
    taskItem?: QuoteCard
    users: FormValues["invited_users"]
    onSubmit: (data: QuoteCard) => void
    isPending: boolean
    isMobile: boolean
    store: number | undefined
    taskId: number
}

const TaskModalContent = ({
    taskItem,
    users,
    onSubmit,
    isPending,
    activeTab,
    setActiveTab,
    closeTaskModal,
    isMobile,
    store,
    taskId,
}: TaskModalContentProps) =>
    isMobile ? (
        <>
            <Tabs
                defaultValue="task"
                value={activeTab}
                onValueChange={setActiveTab}
            >
                <div className="flex justify-between items-center gap-2 p-2">
                    <Button className="min-w-4" onClick={closeTaskModal}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <TabsList className="grid w-[85%] grid-cols-2">
                        <TabsTrigger value="task">Vazifa</TabsTrigger>
                        <TabsTrigger value="chat">Chat</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="task">
                    <CompleteTaskManager
                        task={taskItem}
                        taskId={taskId}
                        isPending={isPending}
                        onSubmit={onSubmit}
                        users={users}
                    />
                </TabsContent>
                <TabsContent value="chat">
                    <TaskChat currentId={store} />
                </TabsContent>
            </Tabs>
        </>
    ) : (
        <div className="flex">
            <CompleteTaskManager
                task={taskItem}
                users={users}
                taskId={taskId}
                isPending={isPending}
                onSubmit={onSubmit}
            />
            {!!taskItem?.id && (
                <div className={"w-full lg:w-[55%]"}>
                    <TaskChat currentId={store} />
                </div>
            )}
        </div>
    )

const TaskManagment = ({ users }: { users: FormValues["invited_users"] }) => {
    const navigate = useNavigate()
    const isMobile = useIsMobile()
    const queryClient = useQueryClient()
    const search: any = useSearch({ from: "/_main/project/$id" })
    const { task } = search
    const { store } = useStore<number | undefined>("task-create")
    const { openModal, closeModal: closeTaskModal } = useModal("task-modal")

    const { data: taskItem } = useGet<QuoteCard>(`${TASKS}/${task}`, {
        options: { enabled: !!task },
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

    const [activeTab, setActiveTab] = useState("task")

    const { data, isSuccess, onDragEnd, handleAdd, params, isLoading } =
        useTaskDndHandlers()

    const onSuccess = () => {
        const tasklyKey = [`${PROJECTS_TASKS}/${params?.id}`]
        queryClient.invalidateQueries({ queryKey: [TASKLY_COMMENT] })
        queryClient.invalidateQueries({ queryKey: tasklyKey })
        toast.success(
            task ? "Muvaffaqiyatli yangilandi" : "Muvaffaqiyatli qo'shildi",
        )
    }

    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const onSubmit = (data: QuoteCard) => {
        const payload = { ...data, status: store ?? taskItem?.status }
        const url = task ? `${TASKS}/${task}` : TASKS
        const mutate = task ? mutateUpdate : mutateCreate
        closeModal()
        mutate(url, payload)
        closeTaskModal()
    }

    const closeModal = () => {
        setActiveTab("task")
        navigate({ search: { ...search, task: undefined } })
    }

    useEffect(() => {
        if (task && isSuccess) openModal()
    }, [task, isSuccess])

    useEffect(() => {
        if (task && taskItem) {
            form.reset(taskItem)
        } else {
            form.reset({
                title: "",
                desc: "",
                priority: 1,
                users: [],
                subtasks: [],
            })
        }
    }, [task, taskItem])

    return (
        <div className="relative">
            <TaskHeader users={users} />

            <div className="max-w-full h-[83vh] 2xl:h-[87vh] overflow-x-scroll no-scrollbar-x overflow-y-auto">
                <TaskDnd
                    currentId={store}
                    handleAdd={handleAdd}
                    data={data || []}
                    params={params}
                    isSuccess={isSuccess}
                    onDragEnd={onDragEnd}
                    isLoading={isLoading}
                />
            </div>

            <Modal
                size={task ? "max-w-6xl" : "max-w-2xl"}
                modalKey="task-modal"
                onClose={closeModal}
                className={cn(
                    "outline-none max-w-[100%] lg:max-w-2xl focus:outline-none bg-transparent !p-0 !pb-[1px] border-none ",
                    task && "lg:max-w-6xl  ",
                )}
                classNameIcon="lg:-right-8 lg:top-0 hidden lg:block lg:bg-[#18222C] lg:text-white w-max"
            >
                <FormProvider {...form}>
                    <TaskModalContent
                        taskItem={taskItem}
                        users={users}
                        onSubmit={onSubmit}
                        isPending={isPendingCreate || isPendingUpdate}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        closeTaskModal={closeTaskModal}
                        isMobile={isMobile}
                        store={store}
                        taskId={task}
                    />
                </FormProvider>
            </Modal>

            <DeleteModal
                modalKey="project-delete"
                id={store}
                path={STATUSES}
                refetchKeys={[`${PROJECTS_TASKS}/${params?.id}`]}
            />
        </div>
    )
}

export default TaskManagment
