import GroupStudents from "@/pages/group-detail/students"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/groups/$id/_main/students")({
    component: GroupStudents,
})
