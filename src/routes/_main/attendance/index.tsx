import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/attendance/")({
    loader: () => {
        throw redirect({
            to: "/attendance/students",
        })
    },
})
