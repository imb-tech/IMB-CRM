import PageLayout from "@/layouts/page-layout"
import AttendanceMain from "@/pages/attendance"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/attendance")({
    component: () => <PageLayout><AttendanceMain/></PageLayout>,
})
