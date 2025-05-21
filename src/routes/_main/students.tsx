import PageLayout from "@/layouts/page-layout"
import StudentsMain from "@/pages/students"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/students")({
    component: () => (
        <PageLayout>
            <StudentsMain />
        </PageLayout>
    ),
})
