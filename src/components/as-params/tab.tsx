import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useQueryParams from "@/hooks/use-query-params"
import { cn } from "@/lib/utils"
import { useSearch } from "@tanstack/react-router"
import { ReactNode, useEffect, useRef } from "react"
import { ClassNameValue } from "tailwind-merge"

export default function ParamTabList({
    listClassName,
    wrapperClassName,
    options = [],
    paramName = "tabs",
}: {
    listClassName?: ClassNameValue
    wrapperClassName?: ClassNameValue
    options?: { id: number | string; name: string }[]
    paramName?: keyof SearchParams
}) {
    const search = useSearch({ from: "__root__" })
    const currValue = search[paramName]

    const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => {
        if (!options.length) return
        const activeIndex = options.findIndex((link) => link.id === currValue)
        if (activeIndex !== -1 && tabsRef.current[activeIndex]) {
            tabsRef.current[activeIndex]?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            })
        }
    }, [currValue, options])

    return (
        <div
            className={cn(
                "overflow-x-auto w-full max-w-full md:max-w-2xl",
                wrapperClassName,
            )}
        >
            <TabsList
                className={cn(
                    "flex-nowrap bg-background rounded-md overflow-hidden",
                    listClassName,
                )}
            >
                {options.map((link, index) => (
                    <TabsTrigger
                        key={link.id}
                        ref={(el) => (tabsRef.current[index] = el)}
                        value={link.id as string}
                        className={`${
                            link.id === currValue &&
                            "!bg-primary !text-primary-foreground"
                        } font-medium flex items-center gap-2 whitespace-nowrap`}
                    >
                        {link.name}
                    </TabsTrigger>
                ))}
            </TabsList>
        </div>
    )
}

export function ParamTabProvider({
    paramName = "tabs",
    children,
    defaultValue,
}: {
    paramName?: keyof SearchParams
    children: ReactNode
    defaultValue?: string | number
}) {
    const search = useSearch({ strict: false })
    const { toggleParam } = useQueryParams()

    const tabs = search[paramName] as string

    useEffect(() => {
        if (!tabs && defaultValue) {
            toggleParam(paramName, defaultValue)
        }
    }, [tabs])

    return (
        <Tabs
            value={tabs}
            onValueChange={(path) => toggleParam(paramName, path)}
        >
            {children}
        </Tabs>
    )
}
