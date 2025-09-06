import PageLayout from '@/layouts/page-layout'
import CostMain from '@/pages/reports/cost'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/reports/cost')({
  component: () => (
    <PageLayout>
      <CostMain />
    </PageLayout>
  ),
})
