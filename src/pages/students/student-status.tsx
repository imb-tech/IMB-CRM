import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"

export const studentStatusKeys: Record<string, string> = {
    "3": "O'chirilgan",
    "0": "Yangi",
    "1": "Aktiv",
    "2": "Muzlatilgan",
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
                "p-1 px-2 text-xs flex items-center gap-1 rounded-sm cursor-pointer select-none",
                status == 3 ? "bg-red-500/20 "
                : status == 0 ? "bg-yellow-500/20 "
                : status == 2 ? "bg-gray-500/20 "
                : "bg-green-500/30 ",
                className,
            )}
        >
            {studentStatusKeys[status.toString()]}
            {arrow && <ChevronDown size={14} />}
        </span>
    )
}
