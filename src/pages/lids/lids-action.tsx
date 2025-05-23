import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    ClipboardType,
    EllipsisVertical,
    Pencil,
    Plus,
    Trash2,
} from "lucide-react"

export function LidsAction() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="size-9"
                    icon={<EllipsisVertical width={16} />}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Plus size={16} className="mr-2" />
                        Yangi yaratish
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ClipboardType size={16} className="mr-2" />
                        Forma yaratish
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Pencil size={16} className="mr-2" />
                        O'zgartirish
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-rose-500">
                        <Trash2 size={16} className="mr-2" />
                        O'chirish
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
