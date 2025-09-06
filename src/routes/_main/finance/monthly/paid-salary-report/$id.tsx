import PageLayout from "@/layouts/page-layout"
import FinancePaidSalaryReportMain from "@/pages/finance/paid-salary-report"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
    "/_main/finance/monthly/paid-salary-report/$id",
)({
    component: () => (
        <PageLayout navOnHeader>
            <FinancePaidSalaryReportMain />
        </PageLayout>
    ),
})
