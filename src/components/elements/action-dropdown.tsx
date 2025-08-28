import { useMemo } from "react"

import { EllipsisVertical, LucideIcon, Pencil, Trash2, Share2, Banknote, Replace, NotebookPen, MessageSquareText } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"

type typeAction = "edit" | "delete" | "share" | "payment" | "transfer" | "note" | "sms"

type Action = {
    key: typeAction
    label?: string
    icon?: LucideIcon
    onClick: () => void
}

type Props = {
    className?: ClassNameValue
    options: Action[]
}

export const ACTIONS: Record<
    typeAction,
    { label: string; icon: typeof Pencil, className?: string }
> = {
    edit: { label: "Tahrirlash", icon: Pencil, className: "text-green-500" },
    delete: { label: "O‘chirish", icon: Trash2, className: "text-rose-500" },
    share: { label: "Ulashish", icon: Share2, className: "text-sky-500" },
    payment: { label: "To'lov", icon: Banknote, className: "text-green-500" },
    note: { label: "Eslatma qo'shish", icon: NotebookPen, className: "text-green-500" },
    sms: { label: "SMS yuborish", icon: MessageSquareText, className: "text-yellow-500" },
    transfer: {
        label: "Guruh almashtirish", icon: Replace, className: ""
    },
}


export default function ActionDropdown({ className, options }: Props) {

    const items = useMemo(
        () =>
            options.map((o) => ({
                ...ACTIONS[o.key], // default
                ...o,              // override label/icon/onClick
            })),
        [options]
    )

    return (
        <Popover>
            <PopoverTrigger asChild className="cursor-pointer">
                <EllipsisVertical />
            </PopoverTrigger>
            <PopoverContent
                className="p-0 w-[180px]"
                side="bottom"
                align="end"
            >
                <div
                    className={cn(
                        "bg-card rounded-sm flex flex-col p-3 gap-3 text-sm",
                        className
                    )}
                >
                    {items.map(({ key, label, icon: Icon, onClick, className }) => (
                        <div
                            key={key}
                            className="flex items-center gap-2 hover:pl-1 transition-all duration-150 cursor-pointer"
                            onClick={onClick}
                        >
                            {Icon && <Icon size={18} className={className} />}
                            <p>{label}</p>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
