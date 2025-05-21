import PageLayout from "@/layouts/page-layout"
import { WarehousePages } from "@/pages/warehouse"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/warehouse")({
    component: () => (
        <PageLayout title="Omborlar">
            <WarehousePages />
        </PageLayout>
    ),
})
