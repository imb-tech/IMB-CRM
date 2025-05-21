import BranchesMain from "@/pages/settings/branches"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/settings/_main/branches")({
    component: BranchesMain,
})
