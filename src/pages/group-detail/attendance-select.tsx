import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"
import { Check, Clock, X } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { useParams, useSearch } from "@tanstack/react-router"
import { usePatch } from "@/hooks/usePatch"

type Props = {
    status: number
    student: number
    id?: number
}

const statuses = ["late", "present", "absent"]

const sk: Record<string, string> = {
    "-1": "absent",
    "1": "present",
    "2": "late",
}

const ks: Record<string, number> = {
    absent: -1,
    present: 1,
    late: 2,
}

export function AttendanceSelect({ status, student, id: attId }: Props) {
    const qC = useQueryClient()
    const { mutate } = usePatch()
    const { id } = useParams({ from: "/_main/groups/$id/_main/attendance" })
    const { date } = useSearch({ from: "/_main/groups/$id/_main/attendance" })

    const queryKey = ["platform/group-students/attendances/" + id + "/" + date]

    function handleChange(d: number) {
        const oldData = qC.getQueryData<StudentAttandence[]>(queryKey)
        qC.setQueryData(
            queryKey,
            oldData?.map((st) => {
                if (st.id == student) {
                    return {
                        ...st,
                        attendances: st.attendances?.map((at) =>
                            at.id === attId ?
                                { ...at, status: d == status ? 0 : d }
                            :   at,
                        ),
                    }
                } else return st
            }),
        )

        mutate(
            "platform/group-students/attendance/" + attId,
            {
                status: d == status ? 0 : d,
            },
            {
                onError() {
                    qC.setQueryData(queryKey, oldData)
                },
            },
        )
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="p-0 !h-auto border-none bg-transparent flex items-center rounded-full hover:bg-gray-500/10"
                >
                    {status != 0 && status != 3 ?
                        <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto transition-colors ${getStatusColor(sk[status.toString()])}`}
                        >
                            {getStatusIcon(sk[status.toString()])}
                        </div>
                    :   <div
                            className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center border border-separate border-gray-300 dark:border-gray-400/40",
                                status == 3 ?
                                    "bg-gray-500/5 border-transparent dark:border-transparent"
                                :   "",
                            )}
                        ></div>
                    }
                </Button>
            </PopoverTrigger>
            {status != 3 && <PopoverContent
                className="w-10 border-none shadow-lg rounded-3xl px-0 py-1 flex flex-col gap-1 items-center -mt-[68px]"
                align="center"
            >
                {statuses.map((d) => (
                    <PopoverClose key={d}>
                        <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto transition-colors ${getStatusColor(d)}`}
                            onClick={() => handleChange(ks[d])}
                        >
                            {getStatusIcon(d)}
                        </div>
                    </PopoverClose>
                ))}
            </PopoverContent>}
        </Popover>
    )
}

export const getStatusIcon = (status: string) => {
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

export const getStatusColor = (status: string) => {
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
