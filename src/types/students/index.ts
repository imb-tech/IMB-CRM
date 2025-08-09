type StudentGroup = {
    id: number
    name: string
    balance: string
    status: number
}

type Student = {
    id: number
    full_name: string
    username: string
    phone: string
    photo: string
    balance: string
    gpa: string
    password: string
    branches: number[]
    branches_data: Branch[]
    groups: StudentGroup[]
}

type GroupStudent = {
    id: number
    student: number
    start_date: string
    status: number
    group_name: string
    student_name: string
    student_phone: string
    balance: string
    allowed_statuses: number[]
}
