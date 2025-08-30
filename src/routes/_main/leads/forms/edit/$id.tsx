import { useGet } from "@/hooks/useGet"
import PageLayout from "@/layouts/page-layout"
import CreateAppForm from "@/pages/leads/forms/create-app-form"
import { createFileRoute, useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/leads/forms/edit/$id")({
    component: () => {
        const { id } = useParams({ from: "/_main/leads/forms/edit/$id" })
        const { data } = useGet<FormConfig>(`leads/forms/${id}`)

        return (
            <PageLayout navOnHeader>
                {data ?
                    <CreateAppForm defaultValues={data} />
                :   ""}
            </PageLayout>
        )
    },
})
