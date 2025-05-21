import PageLayout from "@/layouts/page-layout"
import EmployeesMain from "@/pages/employees"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/employees")({
    component: () => <PageLayout><EmployeesMain/></PageLayout>,
})
