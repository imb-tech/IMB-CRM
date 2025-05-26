import PageLayout from "@/layouts/page-layout"
import EmployeesAttendanceMain from "@/pages/attendance/employees"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/attendance/employees")({
    component: () => (
        <PageLayout>
            <EmployeesAttendanceMain />
        </PageLayout>
    ),
})
