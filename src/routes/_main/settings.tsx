import PageLayout from "@/layouts/page-layout"
import SettingsMain from "@/pages/settings"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/settings")({
    component: () => (
        <PageLayout>
            <SettingsMain />
        </PageLayout>
    ),
})
