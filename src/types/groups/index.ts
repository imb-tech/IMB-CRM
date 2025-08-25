type Group = {
    id: number
    teacher_name: "Shohjahon Hamidov"
    course_name: "Test uchun kurs"
    branch_name: "test Filliali"
    room_name: "1 xona"
    shifts_data: GroupShift[]
    name: "frontend 1"
    start_date: "2025-08-01"
    end_date: "2025-08-31"
    price: string
    status: number
    teacher: number
    course: number
    is_active:boolean
    room: number
    branch: number
    students_count: {
        new: number
        active: number
        frozen: number
    },
}

type GroupExam = {
    id: number
    title: string
    take_date: string
    min_score: number
    max_score: number
    files: string
}
 
type GroupFields = {
    name: string
    start_date: string
    end_date: string
    teacher: number
    course: number
    branch: number
    room: number
    shifts: GroupShift[]
}

type GroupShift = {
    id: number
    start_time: string
    end_time: string
    day_of_week: number
    enable: boolean
}
