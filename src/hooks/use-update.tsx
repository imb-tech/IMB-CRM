import { useQueryClient } from "@tanstack/react-query"
import { usePatch } from "./usePatch"

export default function useUpdate() {
    const queryClient = useQueryClient()
    const { mutate } = usePatch()

    function update(queryKey: string[], payload: any) {
        const originalData = queryClient.getQueryData(queryKey)
    }

    return { update }
}
