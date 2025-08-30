import { GROUP_STUDENTS } from '@/constants/api-endpoints'
import { useGet } from '@/hooks/useGet'
import { useSearch } from '@tanstack/react-router'

export default function apiGroupStudents(group?: number | string) {
    const search = useSearch({ from: "__root__" })
    return useGet<GroupStudent[]>(
        GROUP_STUDENTS,
        {
            params: { group, ...search },
            options: {
                queryKey: [GROUP_STUDENTS, search],
                refetchOnMount: true,
                enabled: !!group
            },
        },
    )
}


export function apiGroupDays(group?: number | string, date?: string) {
    return useGet<string[]>(
        "platform/groups/days-to-teach/" + group + "/" + date,
        {
            options: {
                enabled: !!date,
            },
        },
    )
}

export function useGroupMonths(group?: number | string) {
    return useGet<string[]>(
        "platform/groups/months-to-teach/" + group,
    )
}