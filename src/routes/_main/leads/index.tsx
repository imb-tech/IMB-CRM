import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/leads/")({
    beforeLoad() {
        return redirect({ to: "/leads/varonka" })
    },
})
