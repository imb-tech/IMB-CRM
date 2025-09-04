type Reports = {
  name: string
}


type MainCards = {
  absent: number;
  unmarked: number;
  present: number;
  late: number;
};

type AttendancGroupDetail = {
  absent: number;
  full_name: string
  id: number
  late: number
  present: number
  unmarked: number
};

type AttendanceRecord = {
    id: number
    date: string
    student: string
    teacher: string
    reason: string | null
    status: number
}

type AttendancGroup = {
  group_student__group__id: number;
  group_student__group__name: string;
  absent: number;
  unmarked: number;
  present: number;
  late: number;
  end_date: string
  start_date: string
  students_count: number
  teacher: string
};

type AttendanceData = {
  main_cards: MainCards;
  groups: AttendancGroup[];
};