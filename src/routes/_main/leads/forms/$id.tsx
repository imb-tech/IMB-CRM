import PageLayout from "@/layouts/page-layout"
import FormDetail from "@/pages/leads/forms/form-detail"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/leads/forms/$id")({
    component: () => (
        <PageLayout>
            <FormDetail />
        </PageLayout>
    ),
})
