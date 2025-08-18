import PageLayout from "@/layouts/page-layout"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/employees/_main")({
    component: () => (
        <PageLayout navOnHeader={false} classNameLink={"bg-secondary"}>
            <Outlet />
        </PageLayout>
    ),
})
