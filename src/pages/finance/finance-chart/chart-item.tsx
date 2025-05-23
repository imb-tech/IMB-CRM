import { cn } from "@/lib/utils"
import { ChartItemProps } from "./chart"

export function ChartItem({
    item,
    isActive,
    onHover,
    onClick,
    index,
}: ChartItemProps) {
    return (
        <button
            className={cn(
                "flex items-center gap-2 rounded-lg p-2 px-4 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-secondary",
                isActive && "bg-gray-100 dark:bg-secondary",
            )}
            onMouseEnter={() => onHover(index)}
            onClick={() => onClick(index)}
        >
            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />
            <span
                className={cn(
                    "text-muted-foreground",
                    isActive && "font-medium text-foreground",
                )}
            >
                {item.value}% {item.name}
            </span>
        </button>
    )
}
