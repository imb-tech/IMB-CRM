import StudentsAttendanceMain from "@/pages/attendance/students"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/attendance/_main/students")({
    component: StudentsAttendanceMain,
})
