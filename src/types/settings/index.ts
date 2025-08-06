type Settings = {
    name: string
}

type SettingsParams = {
    branchs: string
    rooms: string
    courses: string
    payment_type: string
    holidays: string
    roles: string
}

type Room = {
    id: number
    name: string
    branch_name: string
    created_at: string
    branch: number
}

type Course = {
    id: number
    name: string
    price: number
    duration: number
    color: string
    branch: number
    branch_name: string
}

type Holiday = {
    id: number
    is_active?: boolean
    created_at: string
    updated_at: string
    date: string
    reason: string
}

type Branch = {
    id: number
    name: string
    start_time: string
    end_time: string
    created_at: string
}

type Role = {
    id: number
    name: string
    permissions: string[]
}

type PaymentType = {
    id: number
    name: string
}
