import EmployeesAttendanceMain from '@/pages/attendance/employees'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/attendance/_main/employees')({
  component:EmployeesAttendanceMain
})
