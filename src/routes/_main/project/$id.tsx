import Modal from "@/components/custom/modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { TASKLY_PROJECT } from "@/constants/api-endpoints"
import useQueryParams from "@/hooks/use-query-params"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import PageLayout from "@/layouts/page-layout"
import { cn } from "@/lib/utils"
import ProjectCreate from "@/pages/task-managment/project/create"
import TaskManagment from "@/pages/task-managment/task-board"
import { createFileRoute, useParams } from "@tanstack/react-router"
import { Plus } from "lucide-react"

export const Route = createFileRoute("/_main/project/$id")({
    component: RouteComponent,
})

function RouteComponent() {
    const { openModal } = useModal("project-create")
    const params = useParams({ from: "/_main/project/$id" })
    const { query, updateParams, removeParam } = useQueryParams()
    const { data } = useGet<FormValues>(`${TASKLY_PROJECT}/${params?.id}`, {
        enabled: !!params?.id,
    })

    return (
        <PageLayout
            className={cn(
                "bg-cover relative bg-center overflow-x-auto !overflow-y-hidden px-1  ",
                !!data?.background && "md:pl-2 md:pr-16",
            )}
            style={{
                backgroundImage: `url(${data?.background})`,
            }}
        >
            <TaskManagment users={data?.invited_users || []} />

            <div className="hidden md:flex flex-col gap-2 fixed top-0  right-0 py-20  pb-2 px-2 h-full backdrop-blur-sm bg-white/5">
                {!!data?.invited_users?.length &&
                    data?.invited_users?.map((item, index) => (
                        <TooltipProvider key={index} delayDuration={1}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Avatar
                                        className={cn("h-10 w-10 hover:scale-110 hover:border hover:green-blue-500 cursor-pointer", (Number(query.user_id) === item.id) && "border-2 border-green-400 scale-110")}
                                        key={index}
                                        onClick={() => {
                                            if (Number(query.user_id) === item.id) {
                                                removeParam("user_id")
                                            } else updateParams({ user_id: item.id.toString() })
                                        }}
                                    >
                                        <AvatarImage
                                            src={
                                                item?.photo || undefined
                                            }
                                            alt={item.full_name}
                                        />
                                        <AvatarFallback
                                            className="uppercase !bg-secondary !text-primary"
                                        >
                                            {item.full_name?.slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="left"
                                    align="center"
                                    className="bg-card transition-all duration-200"
                                >
                                    <div
                                        key={index}
                                        className="flex items-center gap-2"
                                    >
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage
                                                src={
                                                    item?.photo || undefined
                                                }
                                                alt={item.full_name}
                                            />
                                            <AvatarFallback
                                                className={
                                                    "uppercase !bg-secondary "
                                                }
                                            >
                                                {item.full_name?.slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p>{item.full_name}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                <div
                    onClick={openModal}
                    className="h-10 w-10 bg-primary/10 border border-primary/60 cursor-pointer hover:bg-primary/15 text-primary rounded-full flex justify-center items-center hover:scale-105"
                >
                    <Plus />
                </div>
            </div>

            <Modal title={"Loyihani tahrirlash"} modalKey="project-create">
                <div className="w-full overflow-hidden px-1">
                    <ProjectCreate item={data || undefined} />
                </div>
            </Modal>
        </PageLayout>
    )
}
