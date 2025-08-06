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

    return { ...cfg, active_branch: branch }
}
