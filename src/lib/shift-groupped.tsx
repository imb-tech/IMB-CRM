import { formatTime } from "./utils"

export const daysMap: Record<number, string> = {
    0: "Du",
    1: "Se",
    2: "Cho",
    3: "Pa",
    4: "Ju",
    5: "Sha",
    6: "Ya",
}

export function shiftGroupped(shifts: GroupShift[]) {

    const grouped: Record<string, number[]> = {}

    for (const shift of shifts) {
        const key = `${formatTime(shift.start_time)}-${formatTime(shift.end_time)}`
        if (!grouped[key]) {
            grouped[key] = []
        }
        grouped[key].push(shift.day_of_week)
    }

    return Object.entries(grouped).map(([key, days]) => {
        const [start_time, end_time] = key.split("-")
        const dayNames = days.sort((a, b) => a - b).map((d) => daysMap[d])
        return {
            days: dayNames.join(", "),
            start_time: start_time.slice(0, 5),
            end_time: end_time.slice(0, 5),
        }
    })
}
