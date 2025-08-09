import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ReactNode } from "react"
import StudentStatus, { studentStatusKeys } from "../students/student-status"
import { PopoverClose } from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { GROUP_STUDENTS } from "@/constants/api-endpoints"
import { usePost } from "@/hooks/usePost"

type Props = {
    allowed_statuses: number[]
    status: number
    student: number
}

export function StatusPopover({
    status,
    allowed_statuses = [],
    student,
}: Props) {
    const qC = useQueryClient()
    const { mutate } = usePost()

    function handleChange(d: number) {
        const data = qC.getQueryData<ListResp<GroupStudent>>([GROUP_STUDENTS])!
        
        qC.setQueriesData<ListResp<GroupStudent>>(
            { queryKey: [GROUP_STUDENTS] },
            {
                ...data,
                results: data?.results?.map((e) => ({
                    ...e,
                    status: e.id == student ? d : e.status,
                })),
            },
        )

        mutate(
            "platform/group-students/change-status",
            {
                status: d,
                group_student: student,
            },
            {
                onError() {
                    qC.setQueriesData<ListResp<GroupStudent>>(
                        { queryKey: [GROUP_STUDENTS] },
                        data,
                    )
                },
            },
        )
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="p-0 !h-auto border-none">
                    <span
                        className={cn(
                            "p-1 px-2 text-xs flex items-center gap-1 rounded-sm cursor-pointer select-none",
                            status == 3 ? "bg-red-500/20 "
                            : status == 0 ? "bg-yellow-500/20 "
                            : status == 2 ? "bg-gray-500/20 "
                            : "bg-green-500/30 ",
                        )}
                    >
                        {studentStatusKeys[status.toString()]}
                        <ChevronDown size={14} />
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-32 border-none p-2 shadow-sm rounded-xl"
                align="start"
            >
                <div className="flex flex-col gap-1 items-start">
                    {allowed_statuses?.map((d) => (
                        <PopoverClose>
                            <span
                                onClick={() => handleChange(d)}
                                key={d}
                                className="hover:scale-105 transition-all duration-200"
                            >
                                <StudentStatus status={d} />
                            </span>
                        </PopoverClose>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
