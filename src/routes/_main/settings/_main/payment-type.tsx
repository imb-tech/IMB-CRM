import PaymentTypeMain from '@/pages/settings/payment-type'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/settings/_main/payment-type')({
  component: PaymentTypeMain
})
