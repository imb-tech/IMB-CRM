import PageLayout from "@/layouts/page-layout"
import StudentsAttendanceMain from "@/pages/attendance/students"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/attendance/students")({
    component: () => (
        <PageLayout>
            <StudentsAttendanceMain />
        </PageLayout>
    ),
})
