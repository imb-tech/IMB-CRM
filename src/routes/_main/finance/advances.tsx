import PageLayout from "@/layouts/page-layout"
import FinanceAdvanceMain from "@/pages/finance/advances"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/finance/advances")({
    component: () => (
        <PageLayout navOnHeader>
            <FinanceAdvanceMain />
        </PageLayout>
    ),
})
