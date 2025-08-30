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
                "mb-1 py-1 pb-1 flex items-start md:items-center justify-between flex-col md:flex-row gap-2 w-full",
                className,
            )}
            {...props}
        >
            <h1 className="text-lg hidden md:block md:text-2xl font-light">{title}</h1>
            <div>{rightComponent}</div>
        </div>
    )
}
