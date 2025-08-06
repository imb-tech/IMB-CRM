import PageLayout from "@/layouts/page-layout"
import LeadDetail from "@/pages/leads/lead-detail/lead-detail"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/leads/$id/user/$user")({
    component: () => (
        <PageLayout>
            <LeadDetail />
        </PageLayout>
    ),
})
