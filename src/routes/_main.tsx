import {
    createFileRoute,
    Outlet,
    useLocation,
    useNavigate,
} from "@tanstack/react-router"
import { useEffect } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { getAccessToken } from "@/lib/get-token"

type ProductSearch = {
    page?: number
    date?: string
}

export const Route = createFileRoute("/_main")({
    component: MainLayout,
    validateSearch: (search: Record<string, unknown>): ProductSearch => {
        return search
    },
})

function MainLayout() {
    const pathname = useLocation().pathname
    const navigate = useNavigate()
    const token = getAccessToken()

    useEffect(() => {
        if (!token) {
            navigate({ to: "/login" })
        }
    }, [pathname])

    return (
        <SidebarProvider defaultOpen={!false}>
            <AppSidebar />
            <SidebarInset>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}

export default MainLayout
