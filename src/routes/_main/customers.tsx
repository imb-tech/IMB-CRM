import PageLayout from "@/layouts/page-layout"
import { CustomersPages } from "@/pages/customers"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/customers")({
    component: () => (
        <PageLayout title="Mijozlar">
            <CustomersPages />
        </PageLayout>
    ),
})
