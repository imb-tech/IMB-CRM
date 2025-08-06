import { AuthLayout } from "@/components/layout/auth-layout"
import { getAccessToken } from "@/lib/get-token"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth")({
    component: () => (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    ),
    beforeLoad: () => {
        const token = getAccessToken()
        if (token) {
            throw redirect({
                to: "/",
            })
        }
    },
})
