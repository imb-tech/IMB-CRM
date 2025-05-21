import PageLayout from "@/layouts/page-layout"
import FinanceMain from "@/pages/finance"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/finance")({
    component: () => <PageLayout><FinanceMain/></PageLayout>,
})
