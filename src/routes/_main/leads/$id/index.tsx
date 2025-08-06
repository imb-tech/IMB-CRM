import { useGet } from "@/hooks/useGet"
import PageLayout from "@/layouts/page-layout"
import LeadsMain from "@/pages/leads"
import { pipelineUrl } from "@/pages/leads/lead-deal-selector"
import { createFileRoute, useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/leads/$id/")({
    component: RouteComponent,
})

function RouteComponent() {
    const params = useParams({ from: "/_main/leads/$id/" })
    const { data } = useGet<{
        background: string
    }>(`${pipelineUrl}/${params?.id}`, {
        options: { enabled: !!params?.id },
    })

    return (
        <PageLayout
            className={
                "bg-cover bg-center overflow-x-auto !overflow-y-hidden px-1 sm:px-4 "
            }
            style={{
                backgroundImage: `url(${data?.background})`,
            }}
        >
            <LeadsMain />
        </PageLayout>
    )
}
