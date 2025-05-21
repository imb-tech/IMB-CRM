import PageLayout from "@/layouts/page-layout"
import { OrdersDetailsPages } from "@/pages/orders/view"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/_orders/order/$id")({
    component: () => (
        <PageLayout title="Buyurtmalar">
            <OrdersDetailsPages />
        </PageLayout>
    ),
})
