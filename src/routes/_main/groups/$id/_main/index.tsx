import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/groups/$id/_main/")({
    loader: ({ params }) => {
        throw redirect({
            to: "/groups/$id/students",
            params,
        })
    },
    component: () => null,
})
