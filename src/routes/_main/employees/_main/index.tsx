import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/employees/_main/")({
    beforeLoad() {
        return redirect({
            to: "/employees/hr",
        })
    },
})
