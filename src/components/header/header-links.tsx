import { menuItems } from "@/constants/menu"
import { useLocation, useNavigate, useRouter } from "@tanstack/react-router"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { findChildPaths, getCurrentKey, getLinkKey, useIsActiveEx } from "@/constants/util.menu"

export default function HeaderLinks({
    defaultLinks,
    navOnHeader,
}: {
    defaultLinks?: SubMenuItem[]
    navOnHeader?: boolean
}) {
    if (!navOnHeader) return null

    const location = useLocation()
    const router = useRouter()
    const items = useMemo(
        () => (defaultLinks ? defaultLinks : findChildPaths(menuItems, location.pathname)),
        [defaultLinks, location.pathname]
    )
    const navigate = useNavigate()
    const { isActive } = useIsActiveEx()

    const currentKey = getCurrentKey(location)

    const computed = useMemo(
        () =>
            items.map((link) => {
                const key = getLinkKey(router, link as any)
                const active = isActive(link as any, location) // ❗ faqat tabs-aware
                return { link, key, active }
            }),
        [items, router, location, isActive]
    )


    const handleChange = (val: string) => {
        const found = computed.find((x) => x.key === val)
        if (!found) return
        const { to, search } = found.link as any
        navigate({ to, search })
    }

    return (
        <div>
            {!!items.length && (
                <Tabs value={currentKey} onValueChange={handleChange}>
                    <TabsList className="bg-transparent">
                        {computed.map(({ link, key, active }) => (
                            <TabsTrigger
                                key={key}
                                value={key}
                                className={cn(
                                    "font-medium flex items-center gap-2 hover:bg-primary/10",
                                    active && "!bg-primary/20 !text-primary"
                                )}
                            >
                                {link.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            )}
        </div>
    )
}
