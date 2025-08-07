import { useLocation, useNavigate } from "@tanstack/react-router"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useRef } from "react"
import { findChildPaths, useIsActive } from "./header-links"
import { menuItems } from "@/constants/menu"
import { cn } from "@/lib/utils"

export default function MobileHeaderLinks({
    defaultLinks,
    navOnHeader,
}: {
    defaultLinks?: SubMenuItem[]
    navOnHeader?: boolean
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
                    <TabsList className="flex-nowrap bg-background">
                        {items.map((link, index) => (
                            <TabsTrigger
                                key={link.title}
                                ref={(el) => (tabsRef.current[index] = el)}
                                value={link.to}
                                className={`${
                                    isActive(link, pathname) &&
                                    "!bg-primary !text-primary-foreground"
                                } font-medium flex items-center gap-2 whitespace-nowrap`}
                            >
                                {link.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </div>
    )
}
