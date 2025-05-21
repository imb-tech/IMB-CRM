import { cn } from "@/lib/utils"
import {
    Edit,
    EllipsisVertical,
    Eye,
    SquarePen,
    Trash2,
    Undo,
} from "lucide-react"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"

type Props = {
    menuMode?: boolean
    onEdit?: () => void
    onDelete?: () => void
    onUndo?: () => void
    onView?: () => void
    className?: string
}

export default function TableActions({
    menuMode = false,
    onEdit,
    onDelete,
    onUndo,
    onView,
    className,
}: Props) {
    return menuMode ?
            <DropdownMenu>
                <DropdownMenuTrigger asChild className={className}>
                    <Button
                        variant="ghost"
                        className="!text-primary"
                        size={"icon"}
                        icon={<EllipsisVertical width={18} />}
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={1}>
                    {onView && (
                        <DropdownMenuItem
                            onClick={onView}
                            className="!text-green-500"
                        >
                            <Eye width={16} />
                            Ko'rish
                        </DropdownMenuItem>
                    )}
                    {onEdit && (
                        <DropdownMenuItem
                            onClick={onEdit}
                            className="!text-primary"
                        >
                            <Edit width={16} />
                            Tahrirlash
                        </DropdownMenuItem>
                    )}
                    {onDelete && (
                        <DropdownMenuItem
                            onClick={onDelete}
                            className="!text-destructive"
                        >
                            <Trash2 width={16} /> O'chirish
                        </DropdownMenuItem>
                    )}
                    {onUndo && (
                        <DropdownMenuItem
                            onClick={onUndo}
                            className="!text-destructive"
                        >
                            <Undo width={16} /> Qaytarish
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        :   <div
                className={cn(
                    "flex items-center justify-center gap-3 py-2",
                    className,
                )}
            >
                {onView && (
                    <Button
                        icon={<Eye className="text-green-500" size={16} />}
                        size="sm"
                        className="p-0 h-3"
                        variant="ghost"
                        onClick={onView}
                    ></Button>
                )}
                {onEdit && (
                    <Button
                        icon={<SquarePen className="text-primary" size={16} />}
                        size="sm"
                        className="p-0 h-3"
                        variant="ghost"
                        onClick={onEdit}
                    ></Button>
                )}
                {onDelete && (
                    <Button
                        icon={<Trash2 className="text-destructive" size={16} />}
                        size="sm"
                        className="p-0 h-3"
                        variant="ghost"
                        onClick={onDelete}
                    ></Button>
                )}
                {onUndo && (
                    <Button
                        icon={<Undo className="text-destructive" size={16} />}
                        size="sm"
                        className="p-0 h-3"
                        variant="ghost"
                        onClick={onUndo}
                    ></Button>
                )}
            </div>
}
