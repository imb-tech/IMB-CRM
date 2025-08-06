import { cn } from "@/lib/utils"
import { HTMLProps, ReactNode } from "react"

type Props = {
    title?: string
    rightComponent?: ReactNode
}

export default function SectionHeader({
    title = "Title",
    rightComponent,
    className,
    ...props
}: Props & HTMLProps<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "mb-1 py-2 flex items-center justify-between",
                className,
            )}
            {...props}
        >
            <h1 className="text-lg md:text-2xl font-medium text-emerald-900 mb-2">
                {title}
            </h1>
            <div>{rightComponent}</div>
        </div>
    )
}
