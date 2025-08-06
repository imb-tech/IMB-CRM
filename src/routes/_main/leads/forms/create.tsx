import PageLayout from '@/layouts/page-layout'
import CreateAppForm from '@/pages/leads/forms/create-app-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/leads/forms/create')({
  component: () => (
    <PageLayout>
      <CreateAppForm />
    </PageLayout>
  ),
})
