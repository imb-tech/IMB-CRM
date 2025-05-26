import PageLayout from "@/layouts/page-layout"
import IncomeMain from "@/pages/finance/income"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/finance/income")({
    component: () => (
        <PageLayout>
            <IncomeMain />
        </PageLayout>
    ),
})
