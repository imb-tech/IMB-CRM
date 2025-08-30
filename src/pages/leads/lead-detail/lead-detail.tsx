import { Card } from "@/components/ui/card"
import LeadNotes from "./lead-note-tasks"
import CreateLeadForm from "../leadform/create-lead-form"
import { useGet } from "@/hooks/useGet"
import { useParams } from "@tanstack/react-router"
import LeadResponses from "./lead-responses"
import FormSkeleton from "./lead-detail-skeleton"

export default function LeadDetail() {
    const { user } = useParams({ from: "/_main/leads/varonka/$id/user/$user" })
    const { data, isLoading } = useGet<Lead>(`leads/crud/${user}`)

    return (
        <div className="text-foreground">
            <div className="flex items-start gap-3 flex-col md:flex-row">
                <div className="md:flex-[0.4] w-full flex flex-col gap-3">
                    {isLoading ?
                        <FormSkeleton />
                    :   <CreateLeadForm data={data} />}
                    <LeadResponses />
                </div>

                <Card className="md:flex-[0.6] w-full">
                    <LeadNotes />
                </Card>
            </div>
        </div>
    )
}
