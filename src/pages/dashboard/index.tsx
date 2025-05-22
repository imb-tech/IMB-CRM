import FullCalendar from "@/components/ui/full-calendar"
import { DashboardCard } from "./dashboard-card"
import { Card, CardContent } from "@/components/ui/card"

const data: TCalendar = {
    room_list: [
        { id: "1", name: "1-xona" },
        { id: "2", name: "2-xona" },
        { id: "3", name: "3-xona" },
        { id: "4", name: "4-xona" },
    ],
    work_time: [
        {
            id: "1",
            roomId: "1",
            startTime: "08:00",
            teacher_name: "Abdisamatov Ozodbek",
            endTime: "08:15",
            course_name: "Frontend ",
            color: "bg-rose-200 border-rose-300",
        },
        {
            id: "2",
            roomId: "1",
            startTime: "08:30",
            teacher_name: "Hamidov Shohjahon",
            endTime: "09:00",
            course_name: "Backend",
            color: "bg-blue-200 border-blue-300",
        },
        {
            id: "3",
            roomId: "2",
            startTime: "09:15",
            teacher_name: "Doniyor Eshmamatov",
            endTime: "10:00",
            course_name: "Frontend",
            color: "bg-amber-200 border-amber-300",
        },
        {
            id: "4",
            roomId: "3",
            startTime: "10:30",
            teacher_name: "Abdurahimov Ahmadboy",
            endTime: "11:15",
            course_name: "Backend",
            color: "bg-emerald-200 border-emerald-300",
        },
        {
            id: "5",
            roomId: "4",
            startTime: "12:00",
            teacher_name: "Kamolxonov Jalolxon",
            endTime: "13:30",
            course_name: "Prezentatsiya",
            color: "bg-purple-200 border-purple-300",
        },
    ],
    work_start_date: "08:00",
    work_end_date: "20:00",
}

const DashboardMain = () => {
    return (
        <div className="space-y-4 w-full">
            <Card className="w-full ">
                <CardContent>
                    <DashboardCard />
                </CardContent>
            </Card>
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
