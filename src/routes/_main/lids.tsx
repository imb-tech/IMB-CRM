import PageLayout from "@/layouts/page-layout"
import LidsMain from "@/pages/lids"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/lids")({
    component: () => (
        <PageLayout>
            <LidsMain />
        </PageLayout>
    ),
})
