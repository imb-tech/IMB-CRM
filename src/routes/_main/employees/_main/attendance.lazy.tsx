import EmployeesAttendance from "@/pages/employees/employee-attendance"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_main/employees/_main/attendance")({
    component: EmployeesAttendance,
})
