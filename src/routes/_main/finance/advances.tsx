import PageLayout from '@/layouts/page-layout'
import CostFinanceMain from '@/pages/finance/cost'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/finance/advances')({
  component: () => (
        <PageLayout navOnHeader>
            <CostFinanceMain/>
        </PageLayout>
    ),
})
