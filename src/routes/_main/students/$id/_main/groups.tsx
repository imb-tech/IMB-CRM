import StudentGroupMain from "@/pages/student-detail/main/groups/groups"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/students/$id/_main/groups")({
    component: StudentGroupMain,
})
