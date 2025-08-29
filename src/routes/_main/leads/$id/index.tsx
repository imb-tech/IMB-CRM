import { useGet } from "@/hooks/useGet"
import PageLayout from "@/layouts/page-layout"
import LeadsMain from "@/pages/leads"
import { pipelineUrl } from "@/pages/leads/lead-deal-selector"
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router"
import { useEffect, useRef } from "react"

export const Route = createFileRoute("/_main/leads/$id/")({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const params = useParams({ from: "/_main/leads/$id/" })
    const { data } = useGet<{
        background: string
    }>(`${pipelineUrl}/${params?.id}`, {
        options: { enabled: !!params?.id },
    })


    console.log(data);
    
    const { data: dataDepartment, isSuccess } =
        useGet<{ id: number; name: string }[]>(pipelineUrl)

    const hasLeads = isSuccess && dataDepartment?.[0]?.id

    const hasNavigated = useRef(false)

    useEffect(() => {
        if (!hasLeads && !hasNavigated.current) {
            hasNavigated.current = true
            navigate({
                to: "/leads",
            })
        }
    }, [hasLeads, navigate, dataDepartment])

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
