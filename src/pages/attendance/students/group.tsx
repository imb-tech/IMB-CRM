import { formatMoney } from "@/lib/format-money"

export default function StudentAttendanceGroupHeader({
    data,
}: {
    data: AttendancGroup
}) {
    return (
        <div className="grid grid-cols-9  gap-14 w-full text-sm items-center text-start">
            <div className="col-span-2 space-y-1">
                <p>{data?.group_student__group__name}
            </p>
             <p className="whitespace-nowrap text-gray-400">
                 {data?.start_date} - {data?.end_date}
            </p>
            </div>
            <p>{data?.teacher}</p>
            <p>{formatMoney(data?.students_count)}</p>
            <p>{formatMoney(data?.present)}</p>
            <p>{formatMoney(data?.absent)}</p>
            <p>{formatMoney(data?.late)}</p>
            <p>{formatMoney(data?.unmarked)}</p>
        </div>
    )
}
