import { Card, CardContent } from "@/components/ui/card"
import { useParams, useSearch } from "@tanstack/react-router"
import { useEffect, useMemo } from "react"
import { NumberInput } from "@/components/ui/number-input"
import SectionHeader from "@/components/elements/section-header"
import apiGroupStudents, { apiGroupDays, useGroupMonths } from "@/services/hooks/use-group-students"
import ParamSwtich from "@/components/as-params/switch"
import MonthNavigator from "@/components/as-params/month-navigator"
import { formatDateToUz } from "@/lib/utils"
import useQueryParams from "@/hooks/use-query-params"
import { getGroupSector, groupDefaultDate } from "./utils"

export default function GroupScore() {
    const { id } = useParams({ from: "/_main/groups/$id/_main/score" })
    const { date } = useSearch({ from: "/_main/groups/$id/_main/score" })

    const { updateParams } = useQueryParams()

    const { data } = apiGroupStudents(id)
    const { data: groupDays } = apiGroupDays(id, '2025-08-01')
    const { data: options } = useGroupMonths(id)

    const months = useMemo(
        () =>
            options?.map((d) => ({
                value: d,
                label: formatDateToUz(d),
            })) ?? [],
        [options],
    )


    const sector = getGroupSector(groupDays)
    const defaultOpt = groupDefaultDate(months)


    useEffect(() => {
        if (defaultOpt?.value || !!date) {
            updateParams({
                date: date ?? defaultOpt?.value
            })
        }
    }, [defaultOpt, date])
    return (
        <div className="w-full">
            <div className="max-w-full mx-auto">
                <SectionHeader
                    title="O'quvchilar baholari"
                    rightComponent={
                        <div className="flex items-center gap-2">
                            <ParamSwtich
                                label="Arxiv"
                                paramName="is_active"
                                reverse
                            />
                            {date && (
                                <MonthNavigator
                                    months={months}
                                    value={date}
                                    onChange={(v) => updateParams({
                                        date: v.toString()
                                    })}
                                    className="min-w-[130px] text-center"
                                />
                            )}
                        </div>
                    }
                />
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-secondary">
                                        <th className="text-left p-4 font-medium  sticky left-0  bg-secondary min-w-[160px]">
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
                                    {data?.map((student) => {
                                        return (
                                            <tr
                                                key={student.id}
                                                className="border-b hover:bg-secondary/40"
                                            >
                                                <td className="sticky left-0  bg-secondary border-r">
                                                    <div className="font-medium pl-2">
                                                        {student.student_name}
                                                    </div>
                                                </td>
                                                {sector.map((day) => {
                                                    return (
                                                        <td
                                                            key={day.day}
                                                            className="p-2 text-center border-r"
                                                        >
                                                            <NumberInput
                                                                className="w-8 h-8 rounded-lg flex items-center text-center justify-center mx-auto border-none border-transparent shadow-none p-0"
                                                                max={9}
                                                                defaultValue={4}
                                                                maxLength={1}
                                                            />
                                                        </td>
                                                    )
                                                })}
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
