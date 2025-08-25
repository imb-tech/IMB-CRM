import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { studentStatusKeys } from "@/pages/students/student-status"

export default function StudentGroupHeader({ data }: { data: Student }) {
    return (
        <div className="grid grid-cols-4  gap-12 w-full text-sm text-start">
            <p>{data?.group_data?.name || "-"}</p>
            <p
                className={cn(
                    data?.status == "3"
                        ? " text-red-500"
                        : data?.status == "0"
                        ? " text-yellow-500 "
                        : data?.status == "2"
                        ? " text-sky-500"
                        : " text-green-500",
                )}
            >
                {studentStatusKeys[data?.status]}
            </p>
            <p className={cn(Number(data?.balance) < 0 && "text-red-500")}>
                {formatMoney(data?.balance)}
            </p>
            <p>{data?.payment_date}</p>
        </div>
    )
}
