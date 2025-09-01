type StudentGroup = {
    id: number
    name: string
    balance: string
    status: number
    start_date: string
    group: number
}

type Student = {
    id: number
    full_name: string
    payment_date?: string
    username: string
    photo: string
    allowed_statuses: number[]
    password: string
    birth_date: string
    phone: string
    balance: string
    is_active: boolean
    deleted_at: string
    gpa: string
    avg_exam_score: number
    avg_score: number
    start_date: string
    branches: number[]
    branches_data: Branch[]
    groups: StudentGroup[]
    status: string
    group_data: {
        status: number
        group: number | null
        name?: string
        start_date: string
        end_date?: string
        teacher?: number
        course?: number
        branch?: number
        room?: number
    }
    shifts_data: GroupShift[]
    parents: {
        full_name: string
        phone: string
        position: string
    }
}

type StudentParents = {
    id: number
    full_name: string
    phone: string
    position: string
    created_at: string
    updated_at: string
    student: string
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
    activated_date: string
    allowed_statuses: number[]
}

type GroupStudentTestStudents = {
    id: number
    student_data: {
        id: number
        full_name: string
        phone: string
    }
    group_data: {
        id: number
        name: string
        start_date: string
        end_date: string
        teacher: string
        course: string
        balance: number
        branch: string
    }
    start_date: string
    activated_date: string
    status: number
    lead: number
}




type GroupStudentPayments = {
    id: number
    author: string
    condition: number
    group_student: number
    start_date: string
    from_date: string
    description: string
    payment_type: string
    payment_type_name: string
    amount: number
    student_data: {
        full_name: string
        id: number
        phone: number
    }
    author_data: {
        full_name: string
        id: number
        phone: number
    }
    created_at: string
    group_data: {
        id: number
        name: string
    }

}


type GroupStudentCreate = {
    group: number
    student: number
    start_date: string
    status: number
    discount: {
        amount: string
        reason: string
    }

}


type Appropriation = {
    id: number
    date: string
    score: number
    answer: string | null
    file: string | null
    is_scored: boolean
    group_student: number
    module_data: {
        id: number
        title: string
        description: string
        controller: string
    }
    group_data: {
        id: number
        name: string
    }
}


type DiscountStudent = {
    id: number
    amount: string
    author_name: string
    count: number
    created_at: string
    group_student: number
    reason: string
    group_data: {
        id: number
        name: string
    }
}


type Notes = {
    id: string
    remind_at: Date
    content: string
    created_at: string
    author_name: string
    time: string
}



type SendMessage = {
    id: string
    message: string
    author_data: {
        id: number
        full_name: string
    }
    provider: string
    status: number
    phone: string
    created_at: string
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