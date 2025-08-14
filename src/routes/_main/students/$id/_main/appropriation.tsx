import StudentAppropriationMain from '@/pages/student-detail/main/appropriation/appropriation'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/students/$id/_main/appropriation')(
  {
    component: StudentAppropriationMain,
  },
)
