import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/finance/")({
    beforeLoad() {
        return redirect({ to: "/finance/monthly" })
    },
})
