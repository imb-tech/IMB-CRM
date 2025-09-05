import MonthNavigator from "@/components/as-params/month-navigator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select2"
import { OPTION_ROOMS } from "@/constants/api-endpoints"
import useQueryParams from "@/hooks/use-query-params"
import { useGet } from "@/hooks/useGet"
import generateTimeSlots from "@/lib/generate-time-slots"
import { weekdays } from "@/lib/utils"
import { useSearch } from "@tanstack/react-router"
import { useEffect, useState } from "react"

type DashRoom = {
    id: number
    start_time: string // "09:00:00"
    end_time: string   // "11:30:00"
    group: {
        id: number
        name: string
        teacher: string
    }
    room_id: number
}

export default function DashboardCalendar() {
    const [timeSlots, setTimeSlots] = useState<string[]>([])
    const [interval, setTimeInterval] = useState(30) // 15 | 30 | 60 daqiqali slotlar
    const { date } = useSearch({ strict: false })
    const today = new Date().getDay()

    const { updateParams } = useQueryParams()

    const { data: lessons } = useGet<DashRoom[]>(
        "platform/statistics/dashboard/group-shifts",
        { params: { day_of_week: date ? date : today - 1 } }
    )
    const { data: rooms } = useGet<Room[]>(OPTION_ROOMS)

    useEffect(() => {
        const newTimeSlots = generateTimeSlots("08:00", "20:00", interval)
        setTimeSlots(newTimeSlots)
    }, [interval])

    const toMinutes = (hm: string) => {
        const [h, m] = hm.split(":").map(Number)
        return h * 60 + m
    }

    const startMinutes = toMinutes("08:00")
    const endMinutes = toMinutes("20:00")
    const totalMinutes = endMinutes - startMinutes

    const slotWidth = 80 // har bir slotning px kengligi
    const totalWidth = (totalMinutes / interval) * slotWidth
    const rowHeight = 64 // har bir lesson uchun balandlik

    return (
        <div className="bg-background p-3 rounded-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-4">
                    <h1 className="font-medium text-xl">Dars jadvali</h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <MonthNavigator
                            value={date ?? String(today - 1)}
                            months={weekdays.map((e, i) => ({ label: e, value: i.toString() }))}
                            onChange={v => updateParams({ date: v })}
                        />
                    </div>
                    <Select
                        value={String(interval)}
                        onValueChange={(v) => setTimeInterval(Number(v))}
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Interval" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="15">15 daqiqa</SelectItem>
                            <SelectItem value="30">30 daqiqa</SelectItem>
                            <SelectItem value="60">60 daqiqa</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="overflow-x-auto no-scrollbar">
                {/* Header row */}
                <div className="flex">
                    <div className="min-w-[140px] p-2 ">
                        <p className="text-muted-foreground">Xonalar</p>
                    </div>
                    <div className="flex flex-1" style={{ width: totalWidth }}>
                        {timeSlots.map((t) => (
                            <div
                                key={t}
                                className="w-[80px] text-start text-xs flex items-center pl-2"
                                style={{ width: `${slotWidth}px` }}
                            >
                                {t}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="flex">
                    {/* Rooms list */}
                    <div className="flex flex-col min-w-[140px]">
                        {rooms?.map((r) => {
                            const lsns = lessons?.filter((l) => l.room_id === r.id) ?? []
                            return (
                                <div
                                    key={r.id}
                                    className="p-2 border-t border-gray-400/20 flex items-center h-full"
                                    style={{ height: lsns.length ? rowHeight * lsns.length : rowHeight }}
                                >
                                    {r.name}
                                </div>
                            )
                        })}
                    </div>

                    {/* Lessons per room */}
                    <div className="flex-1 w-full" style={{ minWidth: totalWidth, maxWidth: totalWidth }}>
                        {rooms?.map((r) => {
                            const lsns = lessons?.filter((l) => l.room_id === r.id) ?? []

                            return (
                                <div
                                    key={r.id}
                                    className="relative min-w-full border-t border-gray-400/20"
                                    style={{ height: lsns.length ? rowHeight * lsns.length : rowHeight }}
                                >
                                    {/* Vertical grid lines */}
                                    {timeSlots.map((t, idx) => (
                                        <div
                                            key={t}
                                            className="absolute top-0 bottom-0 border-l border-gray-400/20"
                                            style={{ left: `${idx * slotWidth}px`, width: `${slotWidth}px` }}
                                        />
                                    ))}

                                    {/* Lessons */}
                                    {lsns.map((lesson, i) => (
                                        <div
                                            key={lesson.id}
                                            className="absolute text-xs p-1 z-10"
                                            style={{
                                                left: `${(toMinutes(lesson.start_time) - startMinutes) / totalMinutes * totalWidth}px`,
                                                width: `${(toMinutes(lesson.end_time) - toMinutes(lesson.start_time)) / totalMinutes * totalWidth}px`,
                                                top: `${rowHeight * i}px`,
                                                height: `${rowHeight}px`,
                                            }}
                                        >
                                            <div className="text-white p-1 rounded bg-sky-400 w-full h-full">
                                                <p className="font-semibold">{lesson.group.name}</p>
                                                <p className="opacity-75">
                                                    {lesson.group.teacher} ({lesson.start_time.slice(0, 5)}–{lesson.end_time.slice(0, 5)})
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
