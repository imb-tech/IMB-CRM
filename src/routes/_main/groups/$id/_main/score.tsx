import GroupScore from "@/pages/group-detail/score"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/groups/$id/_main/score")({
    component: GroupScore,
})
