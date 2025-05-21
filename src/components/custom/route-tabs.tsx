import { cn } from "@/lib/utils"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { Badge } from "../ui/badge"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { ClassNameValue } from "tailwind-merge"

interface ParamTabsProps {
    options: Array<{
        value: string
        label: string
        content?: React.ReactNode
        badge?: number
        className?: ClassNameValue
        disabled?: boolean
        to: string
    }>
    is_visible?: boolean
    onValueChange?: (val: string) => void
}

const ParamRouteTabs: React.FC<ParamTabsProps> = ({
    options,
    onValueChange,
    is_visible = true,
}) => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const currentTab =
        options.find((opt) => pathname.startsWith(opt.to))?.value ||
        options[0]?.value

    const handleTabChange = (tab: string) => {
        const target = options.find((opt) => opt.value === tab)
        if (target?.to && pathname !== target.to) {
            navigate({ to: target.to })
        }
        onValueChange?.(tab)
    }

    if (!is_visible) return null

    return (
        <Tabs
            value={currentTab}
            onValueChange={handleTabChange}
            className="space-y-4 w-full"
        >
            <div className="max-w-full overflow-x-auto flex flex-wrap items-center justify-between gap-4">
                <TabsList className="h-10 flex gap-3">
                    {options.map(
                        (option) =>
                            !option.disabled && (
                                <TabsTrigger
                                    key={option.value}
                                    value={option.value}
                                    className={cn(
                                        "cursor-pointer relative px-4",
                                        option.className,
                                    )}
                                    aria-current={
                                        option.to === pathname
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    {option.label}
                                    {!!option.badge && (
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                "rounded-full absolute -top-3.5 -right-3.5 border-2 border-background",
                                                pathname.startsWith(
                                                    option.to,
                                                ) &&
                                                    "!bg-primary !text-primary-foreground",
                                            )}
                                        >
                                            {option.badge}
                                        </Badge>
                                    )}
                                </TabsTrigger>
                            ),
                    )}
                </TabsList>
            </div>
        </Tabs>
    )
}

export default ParamRouteTabs
