import EmployeeSalaries from "@/pages/employees/salary"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/employees/_main/salary")({
    component: EmployeeSalaries,
})

