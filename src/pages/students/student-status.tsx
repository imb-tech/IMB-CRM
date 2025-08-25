import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"

export const studentStatusKeys: Record<string, string> = {
    "3": "O'chirilgan",
    "0": "Yangi",
    "1": "Aktiv",
    "2": "Muzlatilgan",
}

export const newStudentStatusKeys: Record<string, string> = {
    "0": "Yangi",
    "1": "Aktiv",
}

export default function StudentStatus({
    status,
    className,
    arrow,
}: {
    status: number
    className?: ClassNameValue
    arrow?: boolean
}) {
    return (
        <span
            className={cn(
                "p-1 px-2 text-xs flex items-center justify-center gap-1 rounded-sm cursor-pointer select-none w-[80px]",
                status == 3
                    ? "bg-red-500/10 text-red-500"
                    : status == 0
                    ? "bg-yellow-500/10 text-yellow-500 "
                    : status == 2
                    ? "bg-sky-500/10  text-sky-500"
                    : "bg-green-500/10 text-green-500",
                className,
            )}
        >
            {studentStatusKeys[status.toString()]}
            {arrow && <ChevronDown size={14} />}
        </span>
    )
}
