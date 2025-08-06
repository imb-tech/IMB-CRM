import { useGet } from "@/hooks/useGet"
import useMe from "@/hooks/useMe"
import PageLayout from "@/layouts/page-layout"
import LeadsMain from "@/pages/leads"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

export const Route = createFileRoute("/_main/leads/")({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const { data } = useMe()

    useEffect(() => {
        if (data?.pipeline) {
            navigate({
                to: "/leads/$id",
                params: { id: data.pipeline.toString() },
            })
        }
    }, [data, navigate])

    return (
        <PageLayout
            className={
                "bg-cover bg-center overflow-x-auto !overflow-y-hidden px-1 sm:px-4 "
            }
        >
            <LeadsMain />
        </PageLayout>
    )
}
