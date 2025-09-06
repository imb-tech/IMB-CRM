import PageLayout from "@/layouts/page-layout"
import FinanceMonthlyReporMain from "@/pages/finance/monthly-report"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/finance/monthly/")({
    component: () => (
        <PageLayout navOnHeader>
            <FinanceMonthlyReporMain/>
        </PageLayout>
    ),
})
