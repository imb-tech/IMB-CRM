import GroupExams from "@/pages/group-detail/exams"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/groups/$id/_main/exams")({
    component: GroupExams,
})
