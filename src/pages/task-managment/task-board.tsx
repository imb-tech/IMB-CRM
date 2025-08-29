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

const TaskManagment = () => {
    const search: any = useSearch({ from: "/_main/project/$id" })
    const navigate = useNavigate()
    const { openModal, closeModal: closeTaskModal } = useModal("task-modal")
    const {
        data,
        isSuccess,
        onDragEnd,
        handleAdd,
        currentId,
        onDelete,
        params,
        isLoading,
    } = useTaskDndHandlers()
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
            <TaskHeader />
            <div className="max-w-full h-[83vh] 2xl:h-[87vh]  overflow-x-scroll no-scrollbar-x overflow-y-auto">
                <TaskDnd
                    currentId={currentId}
                    onDelete={onDelete}
                    handleAdd={handleAdd}
                    data={data || []}
                    params={params}
                    isSuccess={isSuccess}
                    onDragEnd={onDragEnd}
                    isLoading={isLoading}
                />
            </div>

            <Modal
                size={search?.task ? "max-w-[90%]" : "max-w-3xl"}
                title={
                    <span className="opacity-0">{"Vazifalar qo'shish"}</span>
                }
                modalKey="task-modal"
                onClose={closeModal}
                className={cn(
                    "lg:max-h-[90vh] outline-none focus:outline-none  max-h-screen  max-w-[100%] lg:max-w-3xl lg:top-[50%] lg:translate-y-[-50%] top-[100%] translate-y-[-100%] ",
                    search?.task && "!p-0 border-none lg:max-w-[90%]",
                )}
                classNameTitle={search?.task && "hidden"}
                classNameIcon={
                    search?.task &&
                    "lg:-right-8 lg:top-0 hidden lg:block lg:bg-[#18222C] lg:text-white  w-max"
                }
            >
                {/* DESKTOP */}
                <div
                    className={cn(
                        "hidden lg:block",
                        search?.task && " lg:grid lg:grid-cols-2 gap-3 ",
                    )}
                >
                    <CompleteTaskManager
                        currentId={currentId}
                        params={params}
                        comment={search?.task}
                    />
                    {search?.task && (
                        <div>
                            <TaskChat />
                        </div>
                    )}
                </div>

                {/* MOBILE - TABS */}
                <div className="block lg:hidden ">
                    <Tabs
                        defaultValue="task"
                        value={activeTab}
                        onValueChange={setActiveTab}
                    >
                        {search?.task && (
                            <div className="flex justify-between items-center gap-2 px-2 ">
                                <Button
                                    className="min-w-4"
                                    onClick={closeTaskModal}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                                <TabsList className="grid w-[85%] grid-cols-2 ">
                                    <TabsTrigger value="task">
                                        Vazifa
                                    </TabsTrigger>
                                    <TabsTrigger value="chat">Chat</TabsTrigger>
                                </TabsList>
                            </div>
                        )}
                        <TabsContent className="mt-0" value="task">
                            <CompleteTaskManager
                                currentId={currentId}
                                params={params}
                                comment={search?.task}
                            />
                        </TabsContent>
                        <TabsContent className="mt-0" value="chat">
                            <TaskChat />
                        </TabsContent>
                    </Tabs>
                </div>
            </Modal>
            <DeleteModal
                modalKey="project-delete"
                id={currentId}
                path={STATUSES}
                refetchKeys={[`${PROJECTS_TASKS}/${params?.id}`,]}
            />
        </div>
    )
}

export default TaskManagment
