import ParamDatePicker from "@/components/as-params/date-picker"
import PageLayout from "@/layouts/page-layout"
import { OrdersPages } from "@/pages/orders"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/")({
    component: () => (
        <PageLayout
            title="Buyurtmalar"
            rigthChildren={<ParamDatePicker placeholder="Yuklash sanasi" />}
        >
            <OrdersPages />
        </PageLayout>
    ),
})
