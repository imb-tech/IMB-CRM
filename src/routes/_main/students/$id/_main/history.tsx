import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/students/$id/_main/history")({
    component: () => <div>Hello /_main/students/$id/_main/history!</div>,
})
