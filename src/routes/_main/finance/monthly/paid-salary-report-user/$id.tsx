import PageLayout from "@/layouts/page-layout"
import FinancePaidSalaryReportMainUser from "@/pages/finance/paid-salary-report-user"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
    "/_main/finance/monthly/paid-salary-report-user/$id",
)({
    component: () => (
        <PageLayout navOnHeader>
            <FinancePaidSalaryReportMainUser />
        </PageLayout>
    ),
})
