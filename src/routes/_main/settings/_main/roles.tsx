import RolesMain from '@/pages/settings/roles'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/settings/_main/roles')({
  component: RolesMain,
})
