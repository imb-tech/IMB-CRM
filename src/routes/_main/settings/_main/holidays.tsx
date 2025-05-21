import HolidaysMain from '@/pages/settings/holidays'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/settings/_main/holidays')({
  component: HolidaysMain,
})