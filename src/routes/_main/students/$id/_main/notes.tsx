import StudentNotesMain from "@/pages/student-detail/main/notes/notes"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/students/$id/_main/notes")({
    component:StudentNotesMain,
})
