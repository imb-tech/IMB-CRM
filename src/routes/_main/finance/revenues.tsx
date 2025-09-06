import PageLayout from "@/layouts/page-layout"
import IncomeFinanceMain from "@/pages/finance/income"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/finance/revenues")({
    component: () => <PageLayout navOnHeader>
        <IncomeFinanceMain/>
    </PageLayout>,
})
