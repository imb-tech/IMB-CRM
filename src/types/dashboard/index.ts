type Dashboard = {
    name: string
}

type WorkTime = {
    id: string
    roomId: number
    startTime: string
    endTime: string
    course_name: string
    color?: string
    teacher_name: string
}

type RoomList = {
    id: number
    name: string
}

type TCalendar = {
    room_list: RoomList[]
    work_time: WorkTime[]
    work_start_date: string
    work_end_date: string
}
