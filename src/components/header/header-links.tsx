import { menuItems } from "@/constants/menu"
import { useLocation, useNavigate, useRouter } from "@tanstack/react-router"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

export default function HeaderLinks({
    defaultLinks,
}: {
    defaultLinks?: SubMenuItem[]
}) {
    const { pathname } = useLocation()
    const items =
        defaultLinks ? defaultLinks : findChildPaths(menuItems, pathname)
    const navigate = useNavigate()
    const { isActive } = useIsActive()

    return (
        <div>
            {/* {!!items.length && (
                <Tabs
                    value={pathname}
                    onValueChange={(path) => navigate({ to: path })}
                >
                    <TabsList>
                        {items.map((link) => (
                            <TabsTrigger
                                key={link.title}
                                value={link.to}
                                className={`${
                                    isActive(link, pathname) &&
                                    "!bg-primary !text-primary-foreground"
                                } font-medium flex items-center gap-2`}
                            >
                                {link.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            )} */}
        </div>
    )
}

export const findChildPaths = (
    filteredItems: typeof menuItems,
    pathname: string,
) => {
    const currentSection = pathname?.split("/")?.[1]

    return (
        filteredItems?.find(
            (item) =>
                item.items?.find(
                    (subItem) => subItem.to?.slice(1) === currentSection,
                ) || item.to?.slice(1) === currentSection,
        )?.items || []
    )
}

export function useIsActive() {
    const router = useRouter()

    const isActive = (link: any, currentPathname: string) => {
        const built = router.buildLocation(link).pathname

        return (
            currentPathname === built || currentPathname.startsWith(built + "/")
        )
    }

    return { isActive }
}
