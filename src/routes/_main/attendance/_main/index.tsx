import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/attendance/_main/")({
    loader: () => {
        throw redirect({
            to: "/attendance/students",
        })
    },
})
