import PageLayout from "@/layouts/page-layout"
import FormsList from "@/pages/leads/forms/forms-list"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/leads/forms/")({
    component: () => (
        <PageLayout navOnHeader>
            <FormsList />
        </PageLayout>
    ),
})
