import StudentDiscountMain from '@/pages/student-detail/main/discount/discount'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/students/$id/_main/discount')({
  component:StudentDiscountMain
})
