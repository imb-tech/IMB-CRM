import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/students/$id/_main/profile')({
  component: () => <div>Hello /_main/students/$id/_main/profile!</div>,
})
