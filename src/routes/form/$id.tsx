import FormDetail from "@/pages/leads/forms/form-detail"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/form/$id")({
    component: FormDetail,
})
