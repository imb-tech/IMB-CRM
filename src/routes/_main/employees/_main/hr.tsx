import EmployeesMain from "@/pages/employees"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/employees/_main/hr")({
    component: EmployeesMain,
})
