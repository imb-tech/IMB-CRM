import StudentParentsMain from "@/pages/student-detail/main/parents/parents"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/students/$id/_main/parents")({
    component: StudentParentsMain,
})
