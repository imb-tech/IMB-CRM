import PageLayout from "@/layouts/page-layout"
import Sources from "@/pages/leads/sources"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/leads/sources")({
    component: () => (
        <PageLayout navOnHeader>
            <Sources />
        </PageLayout>
    ),
})
