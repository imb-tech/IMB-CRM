import { Card, CardContent } from "@/components/ui/card"
import { Check, X, Clock } from "lucide-react"
import ParamDatePicker from "@/components/as-params/date-picker"
import { useParams, useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import SectionHeader from "@/components/elements/section-header"
import { useGet } from "@/hooks/useGet"
import { formatPhoneNumber } from "@/lib/format-phone-number"

export default function GroupAttendance() {
    const students = [
        { id: 1, name: "Alisher Karimov", phone: "+998901234567" },
        { id: 2, name: "Malika Tosheva", phone: "+998901234568" },
        { id: 3, name: "Bobur Rahimov", phone: "+998901234569" },
        { id: 4, name: "Nilufar Saidova", phone: "+998901234570" },
        { id: 5, name: "Jasur Umarov", phone: "+998901234571" },
        { id: 6, name: "Zarina Abdullayeva", phone: "+998901234572" },
    ]

    const { date } = useSearch({
        from: "/_main/groups/$id/_main/attendance",
    })
    const { id } = useParams({
        from: "/_main/groups/$id/_main/attendance",
    })

    const { data } = useGet<StudentAttandence[]>(
        "platform/group-students/attendances/" + id,
    )
    console.log(data)

    const monthlyAttendance: Record<
        string,
        Record<number, "present" | "absent" | "late">
    > = {
        "2025-06-01": {
            1: "present",
            2: "present",
            3: "absent",
            4: "late",
            5: "present",
            6: "present",
        },
        "2025-06-03": {
            1: "present",
            2: "absent",
            3: "present",
            4: "present",
            5: "late",
            6: "present",
        },
        "2025-06-06": {
            1: "late",
            2: "present",
            3: "present",
            4: "absent",
            5: "present",
            6: "absent",
        },
        "2025-06-08": {
            1: "present",
            2: "present",
            3: "late",
            4: "present",
            5: "absent",
            6: "present",
        },
        "2025-06-10": {
            1: "absent",
            2: "present",
            3: "present",
            4: "present",
            5: "present",
            6: "late",
        },
        "2025-06-13": {
            1: "present",
            2: "late",
            3: "present",
            4: "absent",
            5: "present",
            6: "present",
        },
        "2025-06-15": {
            1: "present",
            2: "present",
            3: "absent",
            4: "present",
            5: "late",
            6: "present",
        },
        "2025-06-17": {
            1: "late",
            2: "present",
            3: "present",
            4: "present",
            5: "present",
            6: "absent",
        },
        "2025-06-20": {
            1: "present",
            2: "absent",
            3: "present",
            4: "late",
            5: "present",
            6: "present",
        },
        "2025-06-22": {
            1: "present",
            2: "present",
            3: "late",
            4: "present",
            5: "absent",
            6: "present",
        },
        "2025-06-24": {
            1: "absent",
            2: "present",
            3: "present",
            4: "present",
            5: "present",
            6: "late",
        },
        "2025-06-27": {
            1: "present",
            2: "late",
            3: "present",
            4: "absent",
            5: "present",
            6: "present",
        },
        "2025-06-29": {
            1: "present",
            2: "present",
            3: "absent",
            4: "present",
            5: "late",
            6: "present",
        },
        "2025-06-31": {
            1: "late",
            2: "present",
            3: "present",
            4: "present",
            5: "present",
            6: "absent",
        },
    }

    // Get days in month
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const days = []

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day)
            const dateKey = currentDate.toISOString().split("T")[0]
            if (day % 1 == 0) {
                days.push({
                    day,
                    date: currentDate,
                    dateKey,
                    hasAttendance: monthlyAttendance[dateKey] !== undefined,
                    dayName: currentDate.toLocaleDateString("uz-UZ", {
                        weekday: "short",
                    }),
                })
            }
        }
        return days
    }

    const days = useMemo(
        () =>
            date ? getDaysInMonth(new Date(date)) : getDaysInMonth(new Date()),
        [date],
    )

    // Get student statistics for the month
    const getStudentStats = (studentId: number) => {
        const attendanceDays = days.filter(
            (day) => monthlyAttendance[day.dateKey],
        )
        const present = attendanceDays.filter(
            (day) => monthlyAttendance[day.dateKey]?.[studentId] === "present",
        ).length
        const absent = attendanceDays.filter(
            (day) => monthlyAttendance[day.dateKey]?.[studentId] === "absent",
        ).length
        const late = attendanceDays.filter(
            (day) => monthlyAttendance[day.dateKey]?.[studentId] === "late",
        ).length
        const total = attendanceDays.length

        return {
            present,
            absent,
            late,
            total,
            percentage:
                total > 0 ? Math.round(((present + late) / total) * 100) : 0,
        }
    }

    const getStatusIcon = (
        status: "present" | "absent" | "late" | undefined,
    ) => {
        switch (status) {
            case "present":
                return <Check className="text-green-600" size={14} />
            case "absent":
                return <X className="text-red-600" size={14} />
            case "late":
                return <Clock className="text-yellow-600" size={14} />
            default:
                return <div className="bg-te-200 rounded-full" />
        }
    }

    const getStatusColor = (
        status: "present" | "absent" | "late" | undefined,
    ) => {
        switch (status) {
            case "present":
                return "bg-green-600/20 hover:bg-green-600/40"
            case "absent":
                return "bg-red-600/20 hover:bg-red-600/40"
            case "late":
                return "bg-yellow-600/20 hover:bg-yellow-600/40"
            default:
                return "bg-gray-50 hover:bg-gray-100"
        }
    }

    return (
        <div>
            <SectionHeader
                title="Oylik yo'qlama jadvali"
                rightComponent={<ParamDatePicker className="min-w-0" />}
            />
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-secondary">
                                    <th className="text-left pl-2 font-medium sticky left-0 bg-secondary min-w-[160px]">
                                        O'quvchi
                                    </th>
                                    {days.map((day) => (
                                        <th
                                            key={day.day}
                                            className="text-center p-2 font-medium text-gray-700 min-w-[40px]"
                                        >
                                            <div className="flex flex-col items-center">
                                                <span className="text-xs text-gray-500">
                                                    {day.dayName}
                                                </span>
                                                <span
                                                    className={`text-sm ${day.hasAttendance ? "text-blue-600 font-semibold" : "text-gray-400"}`}
                                                >
                                                    {day.day}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                    <th className="text-center p-4 font-medium text-gray-700 min-w-[100px]">
                                        Statistika
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((student) => {
                                    const stats = getStudentStats(student.id)
                                    return (
                                        <tr
                                            key={student.id}
                                            className="border-t hover:bg-secondary"
                                        >
                                            <td className="p- sticky left-0 bg-secondary border-r">
                                                <div className="pl-2">
                                                    <div className="text-sm">
                                                        {student.full_name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {formatPhoneNumber(
                                                            student.phone,
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            {days.map((day) => {
                                                const status =
                                                    monthlyAttendance[
                                                        day.dateKey
                                                    ]?.[student.id]
                                                return (
                                                    <td
                                                        key={day.day}
                                                        className="p-1 text-center"
                                                    >
                                                        {day.hasAttendance ?
                                                            <div
                                                                className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-colors ${getStatusColor(status)}`}
                                                            >
                                                                {getStatusIcon(
                                                                    status,
                                                                )}
                                                            </div>
                                                        :   <div className="w-8 h-8 bg-gray-500/10 rounded-lg flex items-center justify-center"></div>
                                                        }
                                                    </td>
                                                )
                                            })}
                                            <td className="p-4 text-center">
                                                <div className="space-y-1">
                                                    <div className="text-sm font-semibold ">
                                                        {stats.percentage}%
                                                    </div>
                                                    <div className="flex justify-center gap-1 text-xs">
                                                        <span className="text-green-600">
                                                            {stats.present}
                                                        </span>
                                                        <span className="text-yellow-600">
                                                            {stats.late}
                                                        </span>
                                                        <span className="text-red-600">
                                                            {stats.absent}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Legend */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-center flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-colors ${getStatusColor("present")}`}
                            >
                                {getStatusIcon("present")}
                            </div>
                            <span>Keldi</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-colors ${getStatusColor("late")}`}
                            >
                                {getStatusIcon("late")}
                            </div>
                            <span>Kech keldi</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-colors ${getStatusColor("absent")}`}
                            >
                                {getStatusIcon("absent")}
                            </div>
                            <span>Kelmadi</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-500/10 rounded-lg flex items-center justify-center"></div>
                            <span>Yo'qlama qilinmagan</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
