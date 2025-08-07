import { useLocation, useNavigate, useSearch } from "@tanstack/react-router"
import { useCallback } from "react"

export default function useQueryParams() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const query = useSearch({ strict: false })

    const push = useCallback(
        (params: Partial<SearchParams>) => {
            navigate({
                to: pathname,
                search: {
                    ...query,
                    ...params,
                },
            })
        },
        [query, pathname],
    )

    function updateParams(params: Partial<SearchParams>) {
        push(params)
    }

    function removeParam(paramName: keyof SearchParams) {
        push({ [paramName]: undefined })
    }

    function toggleParam(
        paramName: keyof SearchParams,
        value?: string | number,
    ) {
        if (value) {
            push({ [paramName]: value })
        } else push({ [paramName]: undefined })
    }

    return {
        updateParams,
        removeParam,
        toggleParam,
        query,
    }
}
