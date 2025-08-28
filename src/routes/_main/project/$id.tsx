import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { TASKLY_PROJECT, TASKLY_PROJECT_USERS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import PageLayout from "@/layouts/page-layout"
import { cn } from "@/lib/utils"
import TaskManagment from "@/pages/task-managment/task-board"
import { createFileRoute, useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/project/$id")({
    component: RouteComponent,
})

function RouteComponent() {
    const params = useParams({ from: "/_main/project/$id" })
    const { data } = useGet<{
        background: string
    }>(`${TASKLY_PROJECT}/${params?.id}`, {
        enabled: !!params?.id,
    })
    const { data: dataUsers, isSuccess } = useGet<
        {
            full_name: string
            face: string
            id: number
        }[]
    >(`${TASKLY_PROJECT_USERS}/${params?.id}`, {
        enabled: !!params?.id,
    })


    return (
        <PageLayout
            className={cn(
                "bg-cover relative bg-center overflow-x-auto !overflow-y-hidden px-1  ",
                !!dataUsers?.length && "md:pl-2 md:pr-16",
            )}
            style={{
                backgroundImage: `url(${data?.background})`,
            }}
        >
            <TaskManagment />

            {isSuccess && !!dataUsers?.length && (
                <div className="hidden md:flex flex-col gap-2 fixed top-0  right-0 py-20  pb-2 px-2 h-full backdrop-blur-sm bg-white/5">
                    {dataUsers?.map((item, index) => (
                        <TooltipProvider delayDuration={1}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Avatar className="h-10 w-10 hover:scale-110 hover:border hover:border-blue-500 cursor-pointer" key={index}>
                                        <AvatarImage
                                            src={item.face || undefined}
                                            alt={item.full_name}
                                        />
                                        <AvatarFallback
                                            className={
                                                "uppercase !bg-secondary !text-primary"
                                            }
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
                                                src={item.face || undefined}
                                                alt={item.full_name}
                                            />
                                            <AvatarFallback
                                                className={
                                                    "uppercase !bg-secondary !text-primary"
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
                </div>
            )}
        </PageLayout>
    )
}
