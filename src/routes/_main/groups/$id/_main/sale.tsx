import GroupSale from "@/pages/group-detail/sale"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/groups/$id/_main/sale")({
    component: GroupSale,
})
