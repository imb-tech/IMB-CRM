import { useGet } from "@/hooks/useGet"
import PageLayout from "@/layouts/page-layout"
import LeadsMain from "@/pages/leads"
import { pipelineUrl } from "@/pages/leads/lead-deal-selector"
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router"
import { useEffect, useRef } from "react"

export const Route = createFileRoute("/_main/leads/varonka/$id/")({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const params = useParams({ from: "/_main/leads/varonka/$id/" })
    const { data } = useGet<{
        background: string
    }>(`${pipelineUrl}/${params?.id}`, {
        options: { enabled: !!params?.id },
    })

    const {
        data: dataDepartment,
        isSuccess,
        isFetched,
    } = useGet<{ id: number; name: string }[]>(pipelineUrl)

    const hasLeads = isSuccess && dataDepartment?.[0]?.id

    const hasNavigated = useRef(false)

    useEffect(() => {
        if (isFetched && !hasLeads && !hasNavigated.current) {
            hasNavigated.current = true
            navigate({
                to: "/leads/varonka",
            })
        }
    }, [hasLeads, navigate, isFetched])

 

    return (
        <PageLayout
            navOnHeader
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
