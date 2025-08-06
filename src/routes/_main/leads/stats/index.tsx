import PageLayout from "@/layouts/page-layout"
import LeadsStatsPage from "@/pages/leads/stats/leads-stats"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/leads/stats/")({
    component: () => (
        <PageLayout>
            <LeadsStatsPage />
        </PageLayout>
    ),
})
