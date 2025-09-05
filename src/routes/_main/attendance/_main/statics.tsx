import StaticsTable from '@/pages/attendance/students/statics-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/attendance/_main/statics')({
  component:StaticsTable,
})
