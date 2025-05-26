import { createFileRoute } from "@tanstack/react-router"
import PageLayout from "@/layouts/page-layout"
import FinanceMain from "@/pages/finance"

export const Route = createFileRoute("/_main/finance/")({
    component: () => (
        <PageLayout>
            <FinanceMain />
        </PageLayout>
    ),
})
