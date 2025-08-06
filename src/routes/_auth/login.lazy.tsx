import { createLazyFileRoute } from "@tanstack/react-router"
import LoginForm from "@/pages/auth/login-form"

export const Route = createLazyFileRoute("/_auth/login")({
    component: LoginForm,
})
