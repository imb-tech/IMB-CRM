import type { ReactNode } from "react"
import { AuthHero } from "./auth-side"
import { ThemeColorToggle } from "../header/color-toggle"

interface AuthLayoutProps {
    children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2 overflow-hidden">
            <AuthHero />
            <div className="w-full h-full">
                <div className="flex justify-end p-3 absolute right-0">
                    <ThemeColorToggle />
                </div>
                <div className="w-full h-full flex items-center">
                    <div className="w-full">{children}</div>
                </div>
            </div>
        </div>
    )
}
