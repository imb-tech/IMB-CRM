import PageLayout from "@/layouts/page-layout"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/attendance/_main")({
    component: () => (
        <PageLayout>
            <Outlet />
        </PageLayout>
    ),
})
