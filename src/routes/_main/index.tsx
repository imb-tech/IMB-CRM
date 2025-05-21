import PageLayout from "@/layouts/page-layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/")({
    component: () => (
        <PageLayout >
            <div>
                hello
            </div>
        </PageLayout>
    ),
})
