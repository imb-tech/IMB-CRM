import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/settings/_main/")({
    loader: () => {
        throw redirect({
            to: "/settings/branches",
        })
    },
})
