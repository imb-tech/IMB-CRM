import { Card, CardContent } from "@/components/ui/card"
import { useParams, useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import SectionHeader from "@/components/elements/section-header"
import { useGet } from "@/hooks/useGet"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { AttendanceSelect } from "./attendance-select"
import { ParamCombobox } from "@/components/as-params/combobox"
import AttendanceFooter from "./attendance-footer"
import { formatDate } from "date-fns"
import { formatDateToUz } from "@/lib/utils"
import ParamSwtich from "@/components/as-params/switch"

export default function GroupAttendance() {
    const { id } = useParams({
        from: "/_main/groups/$id/_main/attendance",
    })
    const { date, is_active } = useSearch({
        strict: false,
    })

    const { data: options } = useGet<string[]>(
        "platform/groups/months-to-teach/" + id,
    )

    const months = useMemo(
        () =>
            options?.map((d) => ({
                value: d,
                label: formatDateToUz(d),
            })) ?? [],
        [options],
    )

    const { data } = useGet<StudentAttandence[]>(
        "platform/group-students/attendances/" + id + "/" + date,
        {
            options: {
                enabled: !!date,
            },
            params: {
                is_active: typeof is_active == "boolean" ? is_active : true,
            },
        },
    )
    const currDate = formatDate(new Date().setDate(1), "yyyy-MM-dd")

    const defaultOpt = useMemo(
        () =>
            months?.length ?
                (months?.find((usr) => usr.value === currDate) ?? months[0])
            :   null,
        [months],
    )

    const { data: days } = useGet<string[]>(
        "platform/groups/days-to-teach/" + id + "/" + date,
        {
            options: {
                enabled: !!date,
            },
        },
    )

    const sector = useMemo(
        () =>
            days?.map((d) => {
                const dt = new Date(d)
                return {
                    date: dt,
                    dayName: dt.toString().slice(0, 3),
                    formatted_date: d,
                    day: dt.getDate(),
                }
            }) ?? [],
        [days],
    )

    return (
        <div>
            <SectionHeader
                title="Oylik yo'qlama jadvali"
                rightComponent={
                    <div className="flex items-center gap-2">
                        <ParamSwtich
                            label="Arxiv"
                            paramName="is_active"
                            reverse
                        />
                        {defaultOpt && (
                            <ParamCombobox
                                dontAllowClear
                                paramName="date"
                                defaultOpt={defaultOpt}
                                options={months}
                                isSearch={false}
                                label="Oy bo'yicha"
                            />
                        )}
                    </div>
                }
            />
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto !rounded-sm">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-secondary">
                                    <th className="text-left pl-2 font-medium sticky left-0 bg-secondary min-w-[160px] border-b border-b-background">
                                        O'quvchi
                                    </th>
                                    {sector.map((day, i) => (
                                        <th
                                            key={i}
                                            className="text-center p-2 font-medium text-gray-700 min-w-[40px]"
                                        >
                                            <div className="flex flex-col items-center">
                                                <span className="text-xs text-gray-500">
                                                    {day.dayName}
                                                </span>
                                                <span
                                                    className={`text-sm ${false ? "text-blue-600 font-semibold" : "text-gray-400"}`}
                                                >
                                                    {day?.day}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                    <th className="text-center p-4 font-medium text-muted-foreground min-w-[100px]">
                                        Statistika
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map(({ statistics, ...student }) => {
                                    return (
                                        <tr
                                            key={student.id}
                                            className="border-t hover:bg-secondary/40"
                                        >
                                            <td className="p-1 sticky left-0 bg-secondary border-b border-b-background">
                                                <div className="pl-2">
                                                    <p className="capitalize text-sm">
                                                        {student.full_name}
                                                    </p>
                                                    <a
                                                        href={`tel:${student.phone}`}
                                                        className="text-xs text-gray-500"
                                                    >
                                                        {formatPhoneNumber(
                                                            student.phone,
                                                        )}
                                                    </a>
                                                </div>
                                            </td>
                                            {sector.map((day, i) => {
                                                const at =
                                                    student.attendances.find(
                                                        (f) =>
                                                            f.date ==
                                                            day.formatted_date,
                                                    )
                                                return (
                                                    <td key={i}>
                                                        <div className="w-full flex justify-center">
                                                            <AttendanceSelect
                                                                status={
                                                                    at ?
                                                                        at.status
                                                                    :   3
                                                                }
                                                                student={
                                                                    student.id
                                                                }
                                                                id={at?.id}
                                                            />
                                                        </div>
                                                    </td>
                                                )
                                            })}
                                            <td className="p-1 text-center">
                                                <div className="space-y-1">
                                                    <div className="text-sm font-semibold">
                                                        {statistics.all}
                                                    </div>
                                                    <div className="flex justify-center gap-1 text-xs">
                                                        <span className="text-green-600">
                                                            {statistics.present}
                                                        </span>
                                                        <span className="text-yellow-600">
                                                            {statistics.late}
                                                        </span>
                                                        <span className="text-red-600">
                                                            {statistics.absent}
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

            <AttendanceFooter />
        </div>
    )
}
