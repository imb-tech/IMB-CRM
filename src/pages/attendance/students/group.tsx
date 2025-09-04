import { formatMoney } from "@/lib/format-money"

export default function StudentAttendanceGroupHeader({
    data,
}: {
    data: AttendancGroup
}) {
    return (
        <div className="grid grid-cols-9  gap-14 w-full text-sm text-start">
            <p>{data?.group_student__group__name}</p>
            <p>{data?.teacher}</p>
            <p className="col-span-2">
                {data?.start_date} - {data?.end_date}
            </p>
            <p>{formatMoney(data?.students_count)}</p>
            <p>{formatMoney(data?.present)}</p>
            <p>{formatMoney(data?.absent)}</p>
            <p>{formatMoney(data?.late)}</p>
            <p>{formatMoney(data?.unmarked)}</p>
        </div>
    )
}
