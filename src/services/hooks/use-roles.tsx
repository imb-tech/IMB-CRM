import { OPTION_ROLES } from '@/constants/api-endpoints'
import { useGet } from '@/hooks/useGet'
import { UseQueryOptions } from '@tanstack/react-query'

export default function apiRoles(options?: Partial<UseQueryOptions<unknown, any, RoleOption[]>> | undefined) {
    const { data, ...conf } = useGet<RoleOption[]>(OPTION_ROLES, { options })
    return {
        ...conf,
        data: data?.map(r => ({ ...r, name: r.name.charAt(0).toUpperCase() + r.name.slice(1) })) ?? []
    }
}