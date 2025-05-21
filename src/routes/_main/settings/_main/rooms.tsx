import RoomsMain from '@/pages/settings/rooms'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/settings/_main/rooms')({
  component: () => <RoomsMain />,
})
