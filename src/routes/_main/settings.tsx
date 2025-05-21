import PageLayout from "@/layouts/page-layout"
import { SettingsPages } from "@/pages/settings"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/settings")({
    component: () => (
        <PageLayout title="Sozlamalar">
            <SettingsPages />
        </PageLayout>
    ),
})
