import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import ParamDatePicker from "@/components/as-params/date-picker"
import { useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import { NumberInput } from "@/components/ui/number-input"
import SectionHeader from "@/components/elements/section-header"

export default function GroupScore() {
    const students = [
        { id: 1, name: "Alisher Karimov", phone: "+998901234567" },
        { id: 2, name: "Malika Tosheva", phone: "+998901234568" },
        { id: 3, name: "Bobur Rahimov", phone: "+998901234569" },
        { id: 4, name: "Nilufar Saidova", phone: "+998901234570" },
        { id: 5, name: "Jasur Umarov", phone: "+998901234571" },
        { id: 6, name: "Zarina Abdullayeva", phone: "+998901234572" },
    ]

    const { date } = useSearch({ from: "/_main/groups/$id/_main/score" })

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

    return (
        <div className="w-full">
            <div className="max-w-full mx-auto">
                <SectionHeader
                    title="O'quvchilar baholari"
                    rightComponent={<ParamDatePicker />}
                />
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-gray-50">
                                        <th className="text-left p-4 font-medium text-gray-700 sticky left-0 bg-gray-50 min-w-[160px]">
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
                                    {students.map((student) => {
                                        const stats = getStudentStats(
                                            student.id,
                                        )
                                        return (
                                            <tr
                                                key={student.id}
                                                className="border-b hover:bg-gray-50"
                                            >
                                                <td className="p- sticky left-0 bg-white border-r">
                                                    <div>
                                                        <div className="font-medium text-gray-800">
                                                            {student.name}
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
                                                            className="p-2 text-center border-r"
                                                        >
                                                            <NumberInput
                                                                className="w-8 h-8 rounded-lg flex items-center text-center justify-center mx-auto border-none border-transparent shadow-none p-0"
                                                                max={9}
                                                                defaultValue={
                                                                    day.day
                                                                }
                                                                maxLength={1}
                                                            />
                                                        </td>
                                                    )
                                                })}
                                                {/* <td className="p-4 text-center">
                                                    <div className="space-y-1">
                                                        <div className="text-sm font-semibold text-gray-800">
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
                                                </td> */}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
