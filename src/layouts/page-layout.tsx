import Header from "@/components/header"
import HeaderLinks, { findChildPaths } from "@/components/header/header-links"
import MobileHeaderLinks from "@/components/header/mobile-header-links"
import { menuItems } from "@/constants/menu"
import { cn } from "@/lib/utils"
import { ReactNode, useLocation } from "@tanstack/react-router"
import { CSSProperties, useMemo } from "react"
import { ClassNameValue } from "tailwind-merge"

type Props = {
    children: ReactNode
    rigthChildren?: ReactNode
    leftChildren?: ReactNode
    items?: SubMenuItem[]
    className?: ClassNameValue
    style?: CSSProperties
    navOnHeader?: boolean
}

const PageLayout = ({
    children,
    rigthChildren,
    leftChildren,
    items,
    style,
    className,
    navOnHeader = false,
}: Props) => {
    const { pathname } = useLocation()
    const defaultLinks = items ? items : findChildPaths(menuItems, pathname)
    const len = useMemo(() => defaultLinks.length, [defaultLinks])

    return (
        <div className="w-full">
            <div
                className={cn(
                    "fixed top-0 right-0 z-10 transition-[width,height,padding] w-full",
                )}
            >
                <Header
                    rigthChildren={rigthChildren}
                    leftChildren={leftChildren}
                    navOnHeader={navOnHeader}
                />
            </div>

            <div
                className={cn(
                    "pt-20 px-4",
                    len ? "pb-2" : "",
                    navOnHeader ? "pb-0" : "",
                )}
            >
                {len ?
                    <MobileHeaderLinks
                        defaultLinks={items}
                        navOnHeader={navOnHeader}
                    />
                :   null}
            </div>

            <main
                style={style}
                className={cn(
                    "flex flex-col xl:gap-2 px-3 md:px-4 pb-4  relative",
                    // len ? "pt-32 md:pt-20" : "pt-12 md:pt-16",
                    className,
                )}
            >
                {children}
            </main>
        </div>
    )
}

export default PageLayout
