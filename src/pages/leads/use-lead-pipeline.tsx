export const pipelineUrl = "leads/pipeline/crud"

import { useGet } from "@/hooks/useGet"

export default function useLeadPipeline({
    is_active = true,
}: {
    is_active?: boolean | "all"
}) {
    return useGet<Pipeline[]>("leads/pipeline/crud", {
        params: { is_active: is_active === "all" ? undefined : is_active },
    })
}
