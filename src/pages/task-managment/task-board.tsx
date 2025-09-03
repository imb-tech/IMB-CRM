import { useEffect, useState } from "react"
import TaskHeader from "./task-dnd/task-header"
import CompleteTaskManager from "./task-dnd/create"
import Modal from "@/components/custom/modal"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useModal } from "@/hooks/useModal"
import { PROJECTS_TASKS, STATUSES } from "@/constants/api-endpoints"
import DeleteModal from "@/components/custom/delete-modal"
import TaskDnd from "./task-dnd/task-dnd"
import { useTaskDndHandlers } from "./task-dnd/useTaskDndhandlers"
import TaskChat from "./chats"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/hooks/use-store"

const TaskManagment = ({ users }: { users: FormValues["invited_users"] }) => {
    const search: any = useSearch({ from: "/_main/project/$id" })
    const navigate = useNavigate()
    const { store } = useStore<number | undefined>("task-create")
    const { openModal, closeModal: closeTaskModal } = useModal("task-modal")
    const { data, isSuccess, onDragEnd, handleAdd, params, isLoading } =
        useTaskDndHandlers()

    const [activeTab, setActiveTab] = useState("task")

    const closeModal = () => {
        setActiveTab("task")
        navigate({
            search: {
                ...search,
                task: undefined,
            },
        })
    }

    useEffect(() => {
        if (search?.task && isSuccess) {
            openModal()
        }
    }, [search?.task, isSuccess])

    return (
        <div className="relative">
            <TaskHeader users={users} />
            <div className="max-w-full h-[83vh] 2xl:h-[87vh]  overflow-x-scroll no-scrollbar-x overflow-y-auto">
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
                size={"max-w-6xl"}
                modalKey="task-modal"
                onClose={closeModal}
                className={cn(
                    "outline-none focus:outline-none bg-transparent  max-w-[100%]  !p-0 !pb-[1px] border-none lg:max-w-6xl ",
                )}
                classNameIcon={
                    "lg:-right-8 lg:top-0 hidden lg:block lg:bg-[#18222C] lg:text-white  w-max"
                }
            >
                {/* DESKTOP */}
                <div className={cn("hidden lg:flex ")}>
                    <CompleteTaskManager users={users} currentId={store} params={params} />

                    {/* Buni ichida Form bor */}
                    <div className="w-full lg:w-[55%]">
                        <TaskChat currentId={store} />
                    </div>
                </div>

                {/* MOBILE - TABS */}
                <div className="block lg:hidden ">
                    <Tabs
                        defaultValue="task"
                        value={activeTab}
                        onValueChange={setActiveTab}
                    >
                        <div className="flex justify-between items-center gap-2 p-2 ">
                            <Button
                                className="min-w-4"
                                onClick={closeTaskModal}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <TabsList className="grid w-[85%] grid-cols-2 ">
                                <TabsTrigger value="task">Vazifa</TabsTrigger>
                                <TabsTrigger value="chat">Chat</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent className="mt-0" value="task">
                            <CompleteTaskManager
                                currentId={store}
                                params={params}
                                users={users}
                            />
                        </TabsContent>
                        <TabsContent className="mt-0" value="chat">
                            <TaskChat currentId={store} />
                        </TabsContent>
                    </Tabs>
                </div>
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
