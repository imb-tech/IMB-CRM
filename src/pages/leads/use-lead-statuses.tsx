import { useGet } from "@/hooks/useGet"
import { useParams } from "@tanstack/react-router"

export default function useLeadStatuses() {
    const { id } = useParams({ strict: false })

    return useGet<LeadStatus[]>("leads/pipeline/status", {
        params: { is_active: true, pipeline: id },
    })
}
