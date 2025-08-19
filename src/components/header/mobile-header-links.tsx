import { useLocation, useNavigate } from "@tanstack/react-router"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useRef } from "react"
import { findChildPaths, useIsActive } from "./header-links"
import { menuItems } from "@/constants/menu"
import { cn } from "@/lib/utils"
import { ClassNameValue } from "tailwind-merge"

export default function MobileHeaderLinks({
    defaultLinks,
    navOnHeader,
    classNameLink,
    activeClassname
}: {
    defaultLinks?: SubMenuItem[]
    navOnHeader?: boolean
    classNameLink?: ClassNameValue
    activeClassname?: ClassNameValue
}) {
    const { pathname } = useLocation()
    const items =
        defaultLinks ? defaultLinks : findChildPaths(menuItems, pathname)
    const navigate = useNavigate()
    const { isActive } = useIsActive()

    // reflar massivini saqlash uchun
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => {
        const activeIndex = items.findIndex((link) => isActive(link, pathname))
        if (activeIndex !== -1 && tabsRef.current[activeIndex]) {
            tabsRef.current[activeIndex]?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            })
        }
    }, [pathname, items, isActive])

    if (!items.length) return null

    return (
        <div className="w-full">
            <div
                className={cn(
                    "overflow-x-auto overflow-y-hidden no-scrollbar-x",
                    navOnHeader ? "md:hidden" : "",
                )}
            >
                <Tabs
                    value={pathname}
                    onValueChange={(path) => navigate({ to: path })}
                >
                    <TabsList
                        className={cn(
                            "flex-nowrap bg-secondary gap-2",
                            classNameLink,
                        )}
                    >
                        {items.map((link, index) => (
                            <TabsTrigger
                                key={link.title}
                                ref={(el) => (tabsRef.current[index] = el)}
                                value={link.to}
                                className={`${
                                    isActive(link, pathname) && `!bg-primary/10 ${activeClassname}`
                                } font-medium flex items-center gap-1.5 whitespace-nowrap`}
                            >
                                {(link as any).icon && (link as any).icon}{" "}
                                {link.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </div>
    )
}
