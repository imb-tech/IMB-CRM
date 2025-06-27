import { cn } from "@/lib/utils"
import { EllipsisVertical } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
    className?: ClassNameValue
}

export default function ActionDropdown({ className }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span
                    className={cn(
                        " text-gray-600/50 p-1 cursor-pointer",
                        className,
                    )}
                >
                    <EllipsisVertical />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" side="left">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        To'lov qilish
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
