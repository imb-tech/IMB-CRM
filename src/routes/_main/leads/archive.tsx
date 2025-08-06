import PageLayout from '@/layouts/page-layout'
import LeadsArchive from '@/pages/leads/archive/leads-archive'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/leads/archive')({
  component: () => (
    <PageLayout>
      <LeadsArchive />
    </PageLayout>
  ),
})
