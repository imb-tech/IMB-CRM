import ParamTabs from "@/components/as-params/tabs"
import ParamRouteTabs from "@/components/custom/route-tabs"
import PageLayout from "@/layouts/page-layout"
import { createFileRoute, Outlet } from "@tanstack/react-router"

const options = [
    {
        value: "branchs",
        label: "Filiallar",
        to: "/settings",
    },
    {
        value: "rooms",
        label: "Xonalar",
        to: "/settings/rooms",
    },
    {
        value: "courses",
        label: "Kurslar",
        to: "/settings/courses",
    },
    {
        value: "payment_type",
        label: "To'lov turlari",
        to: "/settings/payment-type",
    },
    {
        value: "holidays",
        label: "Dam olish kunlari",
        to: "/settings/holidays",
    },
    {
        value: "roles",
        label: "Rollar",
        to: "/settings/roles",
    },
]

export const Route = createFileRoute("/_main/settings/_main")({
    component: () => (
        <PageLayout leftChildren={<ParamRouteTabs options={options} />}>
            <Outlet />
        </PageLayout>
    ),
})
