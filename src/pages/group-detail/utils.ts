import { useGet } from "@/hooks/useGet"
import { formatDate } from "date-fns"
import { useMemo } from "react"

export const getDaysInMonth = (date: Date) => {
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
                hasAttendance: false,
                dayName: currentDate.toLocaleDateString("uz-UZ", {
                    weekday: "short",
                }),
            })
        }
    }
    return days
}

export function getGroupSector(groupDays?: string[]) {
    return useMemo(() => groupDays?.map((d) => {
        const dt = new Date(d)
        return {
            date: dt,
            dayName: dt.toString().slice(0, 3),
            formatted_date: d,
            day: dt.getDate(),
        }
    }) ?? [], [groupDays])
}

export function groupDefaultDate(months: { value: string, label: string }[]) {
    const currDate = formatDate(new Date().setDate(1), "yyyy-MM-dd")
    return useMemo(
        () =>
            months?.length ?
                (months?.find((usr) => usr.value === currDate) ?? months[0])
                : null,
        [months],
    )
}