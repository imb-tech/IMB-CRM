import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/students/$id/_main/notes")({
    component: () => <div>Hello /_main/students/$id/_main/notes!</div>,
})
