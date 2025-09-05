import { PROFILE } from "@/constants/api-endpoints"
import { useGet } from "./useGet"
import { MutateOptions } from "@tanstack/react-query"
import { getActiveBranch } from "@/lib/utils"

export default function useMe(options?: MutateOptions) {
    const branch = getActiveBranch()
    const cfg = useGet<Profile>(PROFILE, {
        options: {
            staleTime: Infinity,
            gcTime: Infinity,
            ...options,
        },
    })
    const branch_data = cfg.data?.branches?.find(f => f.id == branch)

    return {
        ...cfg, active_branch: branch,
        branch_data: branch_data ? {
            ...branch_data,
            start_time: branch_data?.start_time.slice(0, 5),
            end_time: branch_data?.end_time.slice(0, 5)
        } : undefined
    }
}
