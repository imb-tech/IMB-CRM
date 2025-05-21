import PageLayout from "@/layouts/page-layout"
import { LogisticsPages } from "@/pages/logistics"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/logistics")({
    component: () => (
        <PageLayout title="Logistlar">
            <LogisticsPages />
        </PageLayout>
    ),
})
