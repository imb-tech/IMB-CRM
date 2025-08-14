import StudentSendMessageMain from '@/pages/student-detail/main/send-message/message'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/students/$id/_main/send-message')({
  component: StudentSendMessageMain,
})
