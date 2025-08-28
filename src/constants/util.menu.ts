import { useRouter } from "@tanstack/react-router"
import { menuItems } from "./menu"

type LinkLike = {
    to: string
    search?: Record<string, unknown>
}

export function getLinkKey(router: ReturnType<typeof useRouter>, link: LinkLike) {
    // href har doim path + query ni o'zida tutadi (masalan: /reports?tabs=attendance)
    return router.buildLocation(link).href
}

export function getCurrentKey(location: { href?: string; pathname: string; search?: any }) {
    // TanStack Router `location.href` beradi; bo'lmasa qo'lda yasab olamiz
    if (location.href) return location.href
    const params = new URLSearchParams()
    if (location.search) {
        Object.entries(location.search).forEach(([k, v]) => {
            if (v == null) return
            // TanStack search qiymatlari primitive deb faraz qilamiz
            params.set(k, String(v))
        })
    }
    const qs = params.toString()
    return qs ? `${location.pathname}?${qs}` : location.pathname
}

/** link Active bo'lsa true:
 * - agar link.search.tabs bo'lsa => pathname mos va current.search.tabs === link.search.tabs
 * - aks holda => standart pathname (exact yoki prefiks)
 */


export function useIsActiveEx() {
    const router = useRouter()

    const isActive = (
        link: LinkLike,
        current: { pathname: string; search?: Record<string, unknown> }
    ) => {
        const built = router.buildLocation(link)
        const builtPath = built.pathname
        const linkHasTabs = Object.prototype.hasOwnProperty.call(link.search ?? {}, "tabs")
        const curHasTabs = Object.prototype.hasOwnProperty.call(current.search ?? {}, "tabs")

        // Agar link.tabs mavjud bo'lsa YOKI joriy url shu bo'limda tabs bilan ishlayotgan bo'lsa,
        // faqat tabs to'g'ri mos bo'lsa active bo'ladi.
        if (linkHasTabs || curHasTabs) {
            const linkTabs = (link.search ?? ({} as any)).tabs
            const curTabs = (current.search ?? ({} as any)).tabs
            return (
                (current.pathname === builtPath || current.pathname.startsWith(builtPath + "/")) &&
                linkTabs === curTabs
            )
        }

        // Tabs yo'q: oddiy path bo'yicha
        return current.pathname === builtPath || current.pathname.startsWith(builtPath + "/")
    }

    return { isActive }
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
