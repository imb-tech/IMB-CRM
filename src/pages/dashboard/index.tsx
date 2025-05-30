import FullCalendar from "@/pages/dashboard/full-calendar"

import DashboardCard from "./dashboard-card"

const data: TCalendar = {
    room_list: [
        { id: "1", name: "1-xona" },
        { id: "2", name: "2-xona" },
        { id: "3", name: "3-xona" },
        { id: "4", name: "4-xona" },
        { id: "5", name: "5-xona" },
        { id: "6", name: "6-xona" },
        { id: "7", name: "7-xona" },
        { id: "8", name: "8-xona" },
    ],
    work_time: [
        {
            id: "1",
            roomId: "1",
            startTime: "08:00",
            endTime: "08:30",
            teacher_name: "Ustoz 1",
            course_name: "Frontend",
            color: "bg-red-200 dark:bg-red-500  border-red-300",
        },
        {
            id: "2",
            roomId: "1",
            startTime: "08:40",
            endTime: "09:10",
            teacher_name: "Ustoz 2",
            course_name: "Backend",
            color: "bg-blue-200 dark:bg-blue-500  border-blue-300",
        },
        {
            id: "3",
            roomId: "1",
            startTime: "09:20",
            endTime: "09:50",
            teacher_name: "Ustoz 3",
            course_name: "Design",
            color: "bg-green-200 dark:bg-green-500  border-green-300",
        },
        {
            id: "4",
            roomId: "1",
            startTime: "10:00",
            endTime: "10:30",
            teacher_name: "Ustoz 4",
            course_name: "Math",
            color: "bg-yellow-200 dark:bg-yellow-500  border-yellow-300",
        },
        {
            id: "5",
            roomId: "1",
            startTime: "10:40",
            endTime: "11:10",
            teacher_name: "Ustoz 5",
            course_name: "Physics",
            color: "bg-pink-200 dark:bg-pink-500  border-pink-300",
        },
        {
            id: "6",
            roomId: "1",
            startTime: "11:20",
            endTime: "11:50",
            teacher_name: "Ustoz 6",
            course_name: "Speaking",
            color: "bg-purple-200 dark:bg-purple-500  border-purple-300",
        },

        {
            id: "7",
            roomId: "2",
            startTime: "08:10",
            endTime: "08:40",
            teacher_name: "Ustoz A",
            course_name: "Frontend",
            color: "bg-red-200 dark:bg-red-500 border-red-300",
        },
        {
            id: "8",
            roomId: "2",
            startTime: "08:50",
            endTime: "09:20",
            teacher_name: "Ustoz B",
            course_name: "Backend",
            color: "bg-blue-200 dark:bg-blue-500 border-blue-300",
        },
        {
            id: "9",
            roomId: "2",
            startTime: "09:30",
            endTime: "10:00",
            teacher_name: "Ustoz C",
            course_name: "Design",
            color: "bg-green-200 dark:bg-green-500 border-green-300",
        },
        {
            id: "10",
            roomId: "2",
            startTime: "10:10",
            endTime: "10:40",
            teacher_name: "Ustoz D",
            course_name: "Math",
            color: "bg-yellow-200 dark:bg-yellow-500 border-yellow-300",
        },
        {
            id: "11",
            roomId: "2",
            startTime: "10:50",
            endTime: "11:20",
            teacher_name: "Ustoz E",
            course_name: "Physics",
            color: "bg-pink-200 dark:bg-pink-500 border-pink-300",
        },
        {
            id: "12",
            roomId: "2",
            startTime: "11:30",
            endTime: "12:00",
            teacher_name: "Ustoz F",
            course_name: "Speaking",
            color: "bg-purple-200 dark:bg-purple-500 border-purple-300",
        },

        {
            id: "13",
            roomId: "3",
            startTime: "08:20",
            endTime: "08:50",
            teacher_name: "Ustoz 1",
            course_name: "Frontend",
            color: "bg-red-200 dark:bg-red-500 border-red-300",
        },
        {
            id: "14",
            roomId: "3",
            startTime: "09:00",
            endTime: "09:30",
            teacher_name: "Ustoz 2",
            course_name: "Backend",
            color: "bg-blue-200 dark:bg-blue-500 border-blue-300",
        },
        {
            id: "15",
            roomId: "3",
            startTime: "09:40",
            endTime: "10:10",
            teacher_name: "Ustoz 3",
            course_name: "Design",
            color: "bg-green-200 dark:bg-green-500 border-green-300",
        },
        {
            id: "16",
            roomId: "3",
            startTime: "10:20",
            endTime: "10:50",
            teacher_name: "Ustoz 4",
            course_name: "Math",
            color: "bg-yellow-200 dark:bg-yellow-500 border-yellow-300",
        },
        {
            id: "17",
            roomId: "3",
            startTime: "11:00",
            endTime: "11:30",
            teacher_name: "Ustoz 5",
            course_name: "Physics",
            color: "bg-pink-200 dark:bg-pink-500 border-pink-300",
        },
        {
            id: "18",
            roomId: "3",
            startTime: "11:40",
            endTime: "12:10",
            teacher_name: "Ustoz 6",
            course_name: "Speaking",
            color: "bg-purple-200 dark:bg-purple-500 border-purple-300",
        },

        {
            id: "19",
            roomId: "4",
            startTime: "08:30",
            endTime: "09:00",
            teacher_name: "Ustoz A",
            course_name: "Frontend",
            color: "bg-red-200 dark:bg-red-500 border-red-300",
        },
        {
            id: "20",
            roomId: "4",
            startTime: "09:10",
            endTime: "09:40",
            teacher_name: "Ustoz B",
            course_name: "Backend",
            color: "bg-blue-200 dark:bg-blue-500 border-blue-300",
        },
        {
            id: "21",
            roomId: "4",
            startTime: "09:50",
            endTime: "10:20",
            teacher_name: "Ustoz C",
            course_name: "Design",
            color: "bg-green-200 dark:bg-green-500 border-green-300",
        },
        {
            id: "22",
            roomId: "4",
            startTime: "10:30",
            endTime: "11:00",
            teacher_name: "Ustoz D",
            course_name: "Math",
            color: "bg-yellow-200 dark:bg-yellow-500 border-yellow-300",
        },
        {
            id: "23",
            roomId: "4",
            startTime: "11:10",
            endTime: "11:40",
            teacher_name: "Ustoz E",
            course_name: "Physics",
            color: "bg-pink-200 dark:bg-pink-500 border-pink-300",
        },
        {
            id: "24",
            roomId: "4",
            startTime: "11:50",
            endTime: "12:20",
            teacher_name: "Ustoz F",
            course_name: "Speaking",
            color: "bg-purple-200 dark:bg-purple-500 border-purple-300",
        },

        {
            id: "25",
            roomId: "5",
            startTime: "08:40",
            endTime: "09:10",
            teacher_name: "Ustoz 1",
            course_name: "Frontend",
            color: "bg-red-200 dark:bg-red-500 border-red-300",
        },
        {
            id: "26",
            roomId: "5",
            startTime: "09:20",
            endTime: "09:50",
            teacher_name: "Ustoz 2",
            course_name: "Backend",
            color: "bg-blue-200 dark:bg-blue-500 border-blue-300",
        },
        {
            id: "27",
            roomId: "5",
            startTime: "10:00",
            endTime: "10:30",
            teacher_name: "Ustoz 3",
            course_name: "Design",
            color: "bg-green-200 dark:bg-green-500 border-green-300",
        },
        {
            id: "28",
            roomId: "5",
            startTime: "10:40",
            endTime: "11:10",
            teacher_name: "Ustoz 4",
            course_name: "Math",
            color: "bg-yellow-200 dark:bg-yellow-500 border-yellow-300",
        },
        {
            id: "29",
            roomId: "5",
            startTime: "11:20",
            endTime: "11:50",
            teacher_name: "Ustoz 5",
            course_name: "Physics",
            color: "bg-pink-200 dark:bg-pink-500 border-pink-300",
        },
        {
            id: "30",
            roomId: "5",
            startTime: "12:00",
            endTime: "12:30",
            teacher_name: "Ustoz 6",
            course_name: "Speaking",
            color: "bg-purple-200 dark:bg-purple-500 border-purple-300",
        },

        {
            id: "31",
            roomId: "6",
            startTime: "08:50",
            endTime: "09:20",
            teacher_name: "Ustoz A",
            course_name: "Frontend",
            color: "bg-red-200 dark:bg-red-500 border-red-300",
        },
        {
            id: "32",
            roomId: "6",
            startTime: "09:30",
            endTime: "10:00",
            teacher_name: "Ustoz B",
            course_name: "Backend",
            color: "bg-blue-200 dark:bg-blue-500 border-blue-300",
        },
        {
            id: "33",
            roomId: "6",
            startTime: "10:10",
            endTime: "10:40",
            teacher_name: "Ustoz C",
            course_name: "Design",
            color: "bg-green-200 dark:bg-green-500 border-green-300",
        },
        {
            id: "34",
            roomId: "6",
            startTime: "10:50",
            endTime: "11:20",
            teacher_name: "Ustoz D",
            course_name: "Math",
            color: "bg-yellow-200 dark:bg-yellow-500 border-yellow-300",
        },
        {
            id: "35",
            roomId: "6",
            startTime: "11:30",
            endTime: "12:00",
            teacher_name: "Ustoz E",
            course_name: "Physics",
            color: "bg-pink-200 dark:bg-pink-500 border-pink-300",
        },
        {
            id: "36",
            roomId: "6",
            startTime: "12:10",
            endTime: "12:40",
            teacher_name: "Ustoz F",
            course_name: "Speaking",
            color: "bg-purple-200 dark:bg-purple-500 border-purple-300",
        },

        {
            id: "37",
            roomId: "7",
            startTime: "09:00",
            endTime: "09:30",
            teacher_name: "Ustoz 1",
            course_name: "Frontend",
            color: "bg-red-200 dark:bg-red-500 border-red-300",
        },
        {
            id: "38",
            roomId: "7",
            startTime: "09:40",
            endTime: "10:10",
            teacher_name: "Ustoz 2",
            course_name: "Backend",
            color: "bg-blue-200 dark:bg-blue-500 border-blue-300",
        },
        {
            id: "39",
            roomId: "7",
            startTime: "10:20",
            endTime: "10:50",
            teacher_name: "Ustoz 3",
            course_name: "Design",
            color: "bg-green-200 dark:bg-green-500 border-green-300",
        },
        {
            id: "40",
            roomId: "7",
            startTime: "11:00",
            endTime: "11:30",
            teacher_name: "Ustoz 4",
            course_name: "Math",
            color: "bg-yellow-200 dark:bg-yellow-500 border-yellow-300",
        },
        {
            id: "41",
            roomId: "7",
            startTime: "11:40",
            endTime: "12:10",
            teacher_name: "Ustoz 5",
            course_name: "Physics",
            color: "bg-pink-200 dark:bg-pink-500 border-pink-300",
        },
        {
            id: "42",
            roomId: "7",
            startTime: "12:20",
            endTime: "12:50",
            teacher_name: "Ustoz 6",
            course_name: "Speaking",
            color: "bg-purple-200 dark:bg-purple-500 border-purple-300",
        },

        {
            id: "43",
            roomId: "8",
            startTime: "09:10",
            endTime: "09:40",
            teacher_name: "Ustoz A",
            course_name: "Frontend",
            color: "bg-red-200 dark:bg-red-500 border-red-300",
        },
        {
            id: "44",
            roomId: "8",
            startTime: "09:50",
            endTime: "10:20",
            teacher_name: "Ustoz B",
            course_name: "Backend",
            color: "bg-blue-200 dark:bg-blue-500 border-blue-300",
        },
        {
            id: "45",
            roomId: "8",
            startTime: "10:30",
            endTime: "11:00",
            teacher_name: "Ustoz C",
            course_name: "Design",
            color: "bg-green-200 dark:bg-green-500 border-green-300",
        },
        {
            id: "46",
            roomId: "8",
            startTime: "11:10",
            endTime: "11:40",
            teacher_name: "Ustoz D",
            course_name: "Math",
            color: "bg-yellow-200 dark:bg-yellow-500 border-yellow-300",
        },
        {
            id: "47",
            roomId: "8",
            startTime: "11:50",
            endTime: "12:20",
            teacher_name: "Ustoz E",
            course_name: "Physics",
            color: "bg-pink-200 dark:bg-pink-500 border-pink-300",
        },
        {
            id: "48",
            roomId: "8",
            startTime: "12:30",
            endTime: "13:00",
            teacher_name: "Ustoz F",
            course_name: "Speaking",
            color: "bg-purple-200 dark:bg-purple-500 border-purple-300",
        },
    ],
    work_start_date: "08:00",
    work_end_date: "20:00",
}

const DashboardMain = () => {
    return (
        <div className="space-y-4 w-full">
            <DashboardCard />
            <FullCalendar
                rooms={data.room_list}
                work={data.work_time}
                work_start_date={data.work_start_date}
                work_end_date={data.work_end_date}
            />
        </div>
    )
}

export default DashboardMain
