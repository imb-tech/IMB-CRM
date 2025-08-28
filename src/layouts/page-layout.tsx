import Header from "@/components/header"
import MobileHeaderLinks from "@/components/header/mobile-header-links"
import { menuItems } from "@/constants/menu"
import { findChildPaths } from "@/constants/util.menu"
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
    classNameLink?: ClassNameValue
}

const PageLayout = ({
    children,
    rigthChildren,
    leftChildren,
    items,
    style,
    className,
    navOnHeader = false,
    classNameLink,
}: Props) => {
    const { pathname } = useLocation()
    const defaultLinks = items ? items : findChildPaths(menuItems, pathname)
    const len = useMemo(() => defaultLinks.length, [defaultLinks])

    return (
        <div className="w-full h-full overflow-y-auto">
            <div
                className={cn(
                    "fixed top-0 right-0 z-50 transition-[width,height,padding] w-full",
                )}
            >
                <Header
                    rigthChildren={rigthChildren}
                    leftChildren={leftChildren}
                    navOnHeader={navOnHeader}
                />
            </div>

            {!len ? (
                <MobileHeaderLinks
                    defaultLinks={items}
                    navOnHeader={navOnHeader}
                    classNameLink={classNameLink}
                />
            ) : null}

            <main
                style={style}
                className={cn(
                    "mx-auto px-4 h-full overflow-y-auto  pt-20",

                    className,
                )}
            >
                {children}
            </main>
        </div>
    )
}

export default PageLayout
