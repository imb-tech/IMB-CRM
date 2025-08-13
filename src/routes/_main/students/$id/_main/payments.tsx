import StudnetPaymentMain from "@/pages/student-detail/main/payment/payments"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/students/$id/_main/payments")({
    component: StudnetPaymentMain,
})
