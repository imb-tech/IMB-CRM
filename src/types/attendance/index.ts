type Attendance = {
    date: string
    status: "present" | "absent" | "late"
}

type EmployeeAttendance = {
    id: number
    first_name: string
    phone: string
    attendances: Attendance[]
}

type DateObject = {
    date: string
}

type TCalendarAttendance = {
    dates: DateObject[]
    result: EmployeeAttendance[]
}

type AttendanceStudent = {
    id: number
    groupName: string
    teacher: string
    duration: string
    attendance: string
    students: { id: number; name: string; status: string }[]
}

type AttReason = {
    id: number
    date: string,
    status: number
    reason: string
}

type StudentAttandence = {
    id: number,
    full_name: string
    phone: string
    statistics: {
        all: number
        absent: number
        present: number
        late: number
    }
    attendances: AttReason[]
}