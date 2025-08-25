import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { STUDENT_GROUP } from "@/constants/api-endpoints"
import { usePost } from "@/hooks/usePost"
import StudentStatus, {
    studentStatusKeys,
} from "@/pages/students/student-status"

type Props = {
    allowed_statuses: number[]
    status: number
    group: number
}

export function StatusPopover({ status, allowed_statuses = [], group }: Props) {
    const qC = useQueryClient()
    const { mutate } = usePost()

    function handleChange(d: number) {
        mutate(
            "platform/group-students/change-status",
            {
                status: d,
                group_student: group,
            },
            {
                onSuccess() {
                    qC.refetchQueries({ queryKey: [STUDENT_GROUP] })
                },
            },
        )
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="p-0 !h-auto border-none !hover:bg-transparent !bg-transparent">
                    <span
                        className={cn(
                            "p-1 px-2 text-xs flex items-center justify-center gap-1  rounded-sm cursor-pointer select-none",
                            status == 3
                                ? "bg-red-500/10 text-red-500"
                                : status == 0
                                ? "bg-yellow-500/10 text-yellow-500 "
                                : status == 2
                                ? "bg-sky-500/10  text-sky-500"
                                : "bg-green-500/10 text-green-500",
                            "w-[80px]",
                        )}
                    >
                        {studentStatusKeys[status.toString()]}
                        <ChevronDown size={14} />
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-[94px] border-none p-2 shadow-sm rounded-xl"
                align="center"
            >
                <div className="flex flex-col gap-1 items-start">
                    {allowed_statuses?.map((d) => (
                        <PopoverClose>
                            <span
                                onClick={() => handleChange(d)}
                                key={d}
                                className="hover:scale-110 transition-all duration-200"
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
