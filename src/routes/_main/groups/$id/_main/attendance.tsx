import GroupAttendance from "@/pages/group-detail/attendance"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/groups/$id/_main/attendance")({
    component: GroupAttendance,
})
