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


type ParentStudent = {
    id: number
    full_name: string
    username: string
    phone: string
}




type AllPaymentStudent = {
    date: string
    type: string
    amount: number
    returned_amount: number
    bonus: number
    group: string
    comment: string
    created_at: string
    payment_type: string
    received_by: string
}

type StudentDiscount = {
    id: number
    group_student: number
    date: string
    count: number
    reason: string
    author_name: string
    created_at: string
    amount: number
}

type StudentMergeDiscount = Partial<StudentDiscount> & Partial<GroupStudent>