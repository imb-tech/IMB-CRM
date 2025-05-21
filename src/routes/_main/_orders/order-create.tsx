import PageLayout from "@/layouts/page-layout"
import OrderCreate from "@/pages/orders/create"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/_orders/order-create")({
    component: () => (
        <PageLayout title="Buyurtma qo'shish">
            <OrderCreate />
        </PageLayout>
    ),
})
