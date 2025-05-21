import CoursesMain from '@/pages/settings/courses'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/settings/_main/courses')({
  component: CoursesMain,
})
