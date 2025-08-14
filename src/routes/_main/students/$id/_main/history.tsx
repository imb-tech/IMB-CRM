import StudentHistoryMain from "@/pages/student-detail/main/history/history"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/students/$id/_main/history")({
    component:StudentHistoryMain,
})
