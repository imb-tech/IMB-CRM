import PageLayout from '@/layouts/page-layout'
import ReportsMain from '@/pages/reports'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/reports')({
  component: () => <PageLayout>
            <ReportsMain/>
        </PageLayout>,
})
