import FormDetail from '@/pages/leads/forms/form-detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/v1/$path')({
    component: () => {
        return <h1>404</h1>
    },
})
