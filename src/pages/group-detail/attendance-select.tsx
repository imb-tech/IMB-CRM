import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import StudentStatus, { studentStatusKeys } from "../students/student-status"
import { PopoverClose } from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"
import { Check, ChevronDown, Clock, X } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { GROUP_STUDENTS } from "@/constants/api-endpoints"
import { usePost } from "@/hooks/usePost"

type Props = {
    status: number
    student: number
}

const statuses = ["present", "late", "absent"]

export function AttendanceSelect({ status, student }: Props) {
    const qC = useQueryClient()
    const { mutate } = usePost()

    function handleChange(d: number) {
        mutate(
            "platform/group-students/change-status",
            {
                status: d,
                group_student: student,
            },
            {
                onSuccess() {
                    qC.refetchQueries({ queryKey: [GROUP_STUDENTS] })
                },
            },
        )
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="p-0 !h-auto border-none">
                    {status < 4 ?
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto transition-colors ${getStatusColor("present")}`}
                        >
                            {getStatusIcon("present")}
                        </div>
                    :   <div
                            className={cn(
                                "w-8 h-8 bg-gray-500/10 rounded-full flex items-center justify-center",
                                status > 11 ? "bg-transparent" : "",
                            )}
                        ></div>
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-10 border-none shadow-lg rounded-3xl px-0 py-1 flex flex-col gap-1 items-center -mt-1"
                align="center"
            >
                {statuses.map((d) => (
                    <PopoverClose>
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto transition-colors ${getStatusColor(d)}`}
                        >
                            {getStatusIcon(d)}
                        </div>
                    </PopoverClose>
                ))}
            </PopoverContent>
        </Popover>
    )
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "present":
            return <Check className="text-green-600" size={14} />
        case "absent":
            return <X className="text-red-600" size={14} />
        case "late":
            return <Clock className="text-yellow-600" size={14} />
        default:
            return <div className="bg-te-200 rounded-full" />
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "present":
            return "bg-green-600/20 hover:bg-green-600/40"
        case "absent":
            return "bg-red-600/20 hover:bg-red-600/40"
        case "late":
            return "bg-yellow-600/20 hover:bg-yellow-600/40"
        default:
            return "bg-gray-50 hover:bg-gray-100"
    }
}
