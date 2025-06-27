import GroupNotes from "@/pages/group-detail/notes"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/groups/$id/_main/notes")({
    component: GroupNotes,
})
