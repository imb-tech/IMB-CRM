import PageLayout from "@/layouts/page-layout"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/settings/_main")({
    component: () => (
        <PageLayout>
            <Outlet />
        </PageLayout>
    ),
})
