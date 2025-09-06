import MonthNavigator from "@/components/as-params/month-navigator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select2"
import { OPTION_ROOMS } from "@/constants/api-endpoints"
import useHistoryNavigate from "@/hooks/use-history-navigate"
import useQueryParams from "@/hooks/use-query-params"
import { useGet } from "@/hooks/useGet"
import useMe from "@/hooks/useMe"
import generateTimeSlots from "@/lib/generate-time-slots"
import { weekdays } from "@/lib/utils"
import { useSearch } from "@tanstack/react-router"
import { useMemo, useState } from "react"

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

type Room = {
    id: number
    name: string
}

export default function DashboardCalendar() {
    const [interval, setTimeInterval] = useState(30) // 15 | 30 | 60 daqiqali slotlar
    const { date } = useSearch({ strict: false })
    const today = new Date().getDay()
    const { branch_data } = useMe()
    const { push } = useHistoryNavigate()

    const { updateParams } = useQueryParams()

    const { data: lessons } = useGet<DashRoom[]>(
        "platform/statistics/dashboard/group-shifts",
        { params: { day_of_week: date ? date : today - 1 } }
    )
    const { data: rooms } = useGet<Room[]>(OPTION_ROOMS)

    const timeSlots = useMemo(() => {
        if (branch_data) {
            return generateTimeSlots(branch_data?.start_time, branch_data?.end_time, interval)
        } else return []
    }, [branch_data, interval])

    const toMinutes = (hm: string) => {
        const [h, m] = hm.split(":").map(Number)
        return h * 60 + m
    }

    const startMinutes = useMemo(() => branch_data ? toMinutes(branch_data?.start_time) : 0, [branch_data, interval])
    const endMinutes = useMemo(() => branch_data ? toMinutes(branch_data?.end_time) : 0, [branch_data, interval])
    const totalMinutes = endMinutes - startMinutes

    const slotWidth = 80
    const totalWidth = (totalMinutes / interval) * slotWidth
    const rowHeight = 64

    function layoutByOverlap(lsns: DashRoom[]) {
        if (!lsns?.length) return { placed: [] as (DashRoom & { row: number })[], rowCount: 0 }

        const sorted = [...lsns].sort((a, b) => {
            const sa = toMinutes(a.start_time)
            const sb = toMinutes(b.start_time)
            if (sa !== sb) return sa - sb
            return toMinutes(a.end_time) - toMinutes(b.end_time)
        })

        const rowEnds: number[] = []

        const placed = sorted.map((item) => {
            const s = toMinutes(item.start_time)
            const e = toMinutes(item.end_time)

            let rowIndex = rowEnds.findIndex((end) => end <= s)

            if (rowIndex === -1) {
                rowIndex = rowEnds.length
                rowEnds.push(e)
            } else {
                rowEnds[rowIndex] = e
            }

            return { ...item, row: rowIndex }
        })

        return { placed, rowCount: rowEnds.length }
    }

    const layoutPerRoom = useMemo(() => {
        const map = new Map<number, { placed: (DashRoom & { row: number })[], rowCount: number }>()
        rooms?.forEach((r) => {
            const lsns = (lessons ?? []).filter((l) => l.room_id === r.id)
            map.set(r.id, layoutByOverlap(lsns))
        })
        return map
    }, [rooms, lessons])

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
                            const layout = layoutPerRoom.get(r.id)
                            const rows = layout?.rowCount ?? 0
                            return (
                                <div
                                    key={r.id}
                                    className="p-2 border-t border-gray-400/20 flex items-center h-full"
                                    style={{ height: (rows > 0 ? rows : 1) * rowHeight }}
                                >
                                    {r.name}
                                </div>
                            )
                        })}
                    </div>

                    {/* Lessons per room */}
                    <div className="flex-1 w-full" style={{ minWidth: totalWidth, maxWidth: totalWidth }}>
                        {rooms?.map((r) => {
                            const layout = layoutPerRoom.get(r.id)
                            const rows = layout?.rowCount ?? 0
                            const placed = layout?.placed ?? []

                            return (
                                <div
                                    key={r.id}
                                    className="relative min-w-full border-t border-gray-400/20"
                                    style={{ height: (rows > 0 ? rows : 1) * rowHeight }}
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
                                    {placed.map((lesson) => {
                                        const left =
                                            ((toMinutes(lesson.start_time) - startMinutes) / totalMinutes) * totalWidth
                                        const width =
                                            ((toMinutes(lesson.end_time) - toMinutes(lesson.start_time)) / totalMinutes) * totalWidth

                                        return (
                                            <div
                                                key={lesson.id}
                                                className="absolute text-xs p-1 z-10"
                                                style={{
                                                    left: `${left}px`,
                                                    width: `${width}px`,
                                                    top: `${rowHeight * lesson.row}px`,
                                                    height: `${rowHeight}px`,
                                                }}
                                                onClick={() => push(`/groups/${lesson.group.id}`)}
                                            >
                                                <div className="text-white p-1 rounded bg-sky-400 dark:bg-sky-400/30 w-full h-full">
                                                    <p className="font-semibold">{lesson.group.name}</p>
                                                    <p className="opacity-75">
                                                        {lesson.group.teacher} ({lesson.start_time.slice(0, 5)}–{lesson.end_time.slice(0, 5)})
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
