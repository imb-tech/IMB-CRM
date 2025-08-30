import PageLayout from "@/layouts/page-layout"
import LeadsTestStudents from "@/pages/leads/test-lesson-students"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/leads/lesson-test-students")({
    component: () => (
        <PageLayout navOnHeader>
            <LeadsTestStudents />
        </PageLayout>
    ),
})
