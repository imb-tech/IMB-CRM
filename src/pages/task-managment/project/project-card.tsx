import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { getPriorityColor } from "../task-dnd/task-card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Download, Edit, Trash } from "lucide-react"
import clsx from "clsx"
import { useNavigate } from "@tanstack/react-router"
import { format } from "date-fns"
import { useGet } from "@/hooks/useGet"
import { TASKS_EXCEL } from "@/constants/api-endpoints"
import { downloadExcel } from "@/lib/download-excel"

type Props = {
    handleItem: (item: FormValues) => void
    handleDelete: (item: FormValues) => void
    item: FormValues
    index: number
}

function ProjectCard({ handleItem, handleDelete, item, index }: Props) {
    const navigate = useNavigate()
    const { isLoading, refetch } = useGet(`${TASKS_EXCEL}/${item.id}`, {
        enabled: false,
        config: {
            responseType: "blob",
        },
    })

    const handleExcelItem = async () => {
        const response = await refetch()
        if (response.isSuccess) {
            downloadExcel({ data: response.data, name: "Vazifalar" })
        }
    }

    return (
        <Card
            onClick={() =>
                navigate({
                    to: "/project/$id",
                    params: { id: item.id?.toString() },
                })
            }
            className={clsx(
                "dark:bg-background/80 bg-black/50 bg-blend-overlay cursor-pointer min-h-[244px] h-full  bg-center bg-cover",
            )}
            style={{
                backgroundImage: `url(${item.background})`,
            }}
        >
            <CardContent className="h-full text-white flex justify-between flex-col gap-4">
                <div className="space-y-4">
                    <div className="flex justify-between  items-center gap-3">
                        <h1 className="font-semibold text-xl line-clamp-1 break-all ">
                            {index + 1}. {item.name}
                        </h1>
                        <TooltipProvider delayDuration={1}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <AvatarGroup
                                        max={5}
                                        total={item?.users?.length - 5}
                                        countClass="h-10 w-10 "
                                    >
                                        {item?.users.map((item, index) => (
                                            <Avatar
                                                className="h-10 w-10"
                                                key={index}
                                            >
                                                <AvatarImage
                                                    src={
                                                        item?.photo || undefined
                                                    }
                                                    alt={item.full_name}
                                                />
                                                <AvatarFallback
                                                    className={cn(
                                                        "uppercase !bg-secondary !text-muted-foreground",
                                                        getPriorityColor(2),
                                                    )}
                                                >
                                                    {item?.full_name?.slice(
                                                        0,
                                                        2,
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                        ))}
                                    </AvatarGroup>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="bottom"
                                    align="end"
                                    className="bg-card transition-all duration-200"
                                >
                                    <div className="flex flex-col gap-2  max-h-[400px] overflow-y-auto">
                                        {item?.users.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2"
                                            >
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage
                                                        src={
                                                            item?.photo ||
                                                            undefined
                                                        }
                                                        alt={item.full_name}
                                                    />
                                                    <AvatarFallback
                                                        className={cn(
                                                            "uppercase !bg-secondary !text-muted-foreground",
                                                            getPriorityColor(2),
                                                        )}
                                                    >
                                                        {item?.full_name?.slice(
                                                            0,
                                                            2,
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <p>{item?.full_name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <ul className="flex flex-col  gap-2 mb-3">
                        {item?.statuses?.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between"
                            >
                                <span>{item?.name}:</span>
                                <span>
                                    {item?.count} {"vazifalar"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-between items-center gap-3">
                    <h1>{format(item?.created_at, "yyyy-MM-dd")}</h1>
                    {item?.is_update ? (
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleItem(item)
                                }}
                                size={"sm"}
                            >
                                <Edit size={18} />
                            </Button>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(item)
                                }}
                                size={"sm"}
                                variant={"destructive"}
                            >
                                <Trash size={18} />
                            </Button>
                            <Button
                                disabled={isLoading}
                                loading={isLoading}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleExcelItem()
                                }}
                                size={"sm"}
                            >
                                {!isLoading && <Download size={18} />}
                            </Button>
                        </div>
                    ) : null}
                </div>
            </CardContent>
        </Card>
    )
}

export default ProjectCard
