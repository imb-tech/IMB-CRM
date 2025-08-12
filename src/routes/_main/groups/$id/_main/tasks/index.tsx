import GroupTasks from "@/pages/group-detail/group-tasks"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/groups/$id/_main/tasks/")({
    component: GroupTasks,
})
