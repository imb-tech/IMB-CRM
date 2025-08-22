type GroupModuleType = "topic" | "task" | "exam"

type GroupModule = {
    id: number
    group: number
    controller: number
    title: string
    description: string
    date: string
    max_score: number
    min_score: number
    deadline: string
    type: GroupModuleType
    last: boolean
    first: boolean
    is_empty: boolean
    is_homework_required: boolean
    controller_data?: {
        id: number
        full_name: string
    },
    files: {
        id: number
        file: string
    }[]
    uploaded_files: (File | string)[]
    students: GroupModuleStudent[]
}

type GroupModuleStudent = {
    id: number
    module?: number
    group_student?: number
    full_name?: string
    is_selected?: boolean
    status?: string
    answer?: string | null
    file?: string | null
    score?: number
}

type GroupModuleForm = GroupModule & {
    students: {
        id: number
        full_name: string
        is_selected: boolean
        status: string
    }[]
    is_homework_required: boolean
    select_all: boolean
}
