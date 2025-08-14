import PageLayout from "@/layouts/page-layout"
import GroupsMain from "@/pages/groups/groups-home"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/groups/")({
    component: () => (
        <PageLayout>
            <GroupsMain />
        </PageLayout>
    ),
})
