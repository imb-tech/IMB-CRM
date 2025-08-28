import { useLocation, useNavigate, useRouter } from "@tanstack/react-router"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useRef, useMemo } from "react"
import { menuItems } from "@/constants/menu"
import { cn } from "@/lib/utils"
import { ClassNameValue } from "tailwind-merge"
import { findChildPaths, getCurrentKey, getLinkKey, useIsActiveEx } from "@/constants/util.menu"

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
    const location = useLocation()
    const router = useRouter()
    const items = useMemo(
        () => (defaultLinks ? defaultLinks : findChildPaths(menuItems, location.pathname)),
        [defaultLinks, location.pathname]
    )
    const navigate = useNavigate()
    const { isActive } = useIsActiveEx()

    // reflar massivini saqlash uchun
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

    const currentKey = getCurrentKey(location)

    // Items uchun oldindan key va active belgilarini hisoblab olamiz
    const computed = useMemo(
        () =>
            items.map((link) => {
                const key = getLinkKey(router, link as any)
                const active = isActive(link as any, location) // ❗ faqat tabs-aware
                return { link, key, active }
            }),
        [items, router, location, isActive]
    )


    useEffect(() => {
        const activeIndex = computed.findIndex((x) => x.active)
        if (activeIndex !== -1 && tabsRef.current[activeIndex]) {
            tabsRef.current[activeIndex]?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            })
        }
    }, [currentKey, computed])

    if (!items.length) return null

    const handleChange = (val: string) => {
        const found = computed.find((x) => x.key === val)
        if (!found) return
        const { to, search } = found.link as any
        navigate({ to, search })
    }

    return (
        <div className="w-full">
            <div className={cn("overflow-x-auto overflow-y-hidden no-scrollbar-x", navOnHeader ? "md:hidden" : "")}>
                <Tabs value={currentKey} onValueChange={handleChange}>
                    <TabsList className={cn("flex-nowrap bg-secondary gap-2", classNameLink)}>
                        {computed.map(({ link, key, active }, index) => (
                            <TabsTrigger
                                key={key}
                                ref={(el) => (tabsRef.current[index] = el)}
                                value={key}
                                className={cn(
                                    "font-medium flex items-center gap-1.5 whitespace-nowrap",
                                    active && cn("!bg-primary/10 text-primary", activeClassname)
                                )}
                            >
                                {(link as any).icon && (link as any).icon} {link.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </div>
    )
}
