type SubTask = {
    id: number
    title: string
    finished: boolean
}

type QuoteCard = {
    id: number
    title: string
    middle_name: string
    status_id: number
    desc: string
    priority: 1 | 2 | 3
    deadline: string
    subtasks: SubTask[]
    users: number[]
    users_data: {
        id: number
        photo: string
        full_name: string
    }[]
    todo: number
    finished: number
    author: {
        id: number
        full_name: string
        face: string
    }
}

type Column = {
    id: string
    name: string
    count: number
    is_author: boolean
    has_delete: boolean
    tasks: QuoteCard[]
}

type FormValues = {
    name: string
    background: string
    author?: string
    id: number
    finished: number
    processing: number
    todo: number
    is_author: boolean
    created_at: string
    invited_users: {
        id: number
        photo: string
        full_name: string
        is_creator: boolean
        empl_id: number
    }[]
    employees: number[]
}


type OptionEmployees = {
    id: string
    full_name: string
    phone: string
}