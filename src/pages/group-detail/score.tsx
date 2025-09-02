import { Card, CardContent } from "@/components/ui/card"
import { useParams, useSearch } from "@tanstack/react-router"
import { useEffect, useMemo } from "react"
import { NumberInput } from "@/components/ui/number-input"
import SectionHeader from "@/components/elements/section-header"
import apiGroupStudents, { apiGroupDays, useGroupMonths } from "@/services/hooks/use-group-students"
import ParamSwtich from "@/components/as-params/switch"
import MonthNavigator from "@/components/as-params/month-navigator"
import { cn, formatDateToUz } from "@/lib/utils"
import useQueryParams from "@/hooks/use-query-params"
import { getGroupSector, groupDefaultDate } from "./utils"
import { useGet } from "@/hooks/useGet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function GroupScore() {
    const { id } = useParams({ from: "/_main/groups/$id/_main/score" })
    const { date, is_active } = useSearch({ from: "/_main/groups/$id/_main/score" })

    const { updateParams } = useQueryParams()

    const { data } = apiGroupStudents(id, true)
    const { data: groupDays } = apiGroupDays(id, date)
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

    const { data: scores } = useGet<StudentScore[]>(
        "platform/group-students/modules/" + id + "/" + date,
        {
            options: {
                enabled: !!date,
                refetchOnMount: true
            },
            params: {
                is_active: typeof is_active == "boolean" ? is_active : true,
            },
        },
    )

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
                                                className="text-center font-medium text-gray-700"
                                                style={{ minWidth: 30 * (day.modules.length ?? 1) }}
                                            >
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <div className="flex flex-col items-center cursor-pointer dark:hover:bg-primary/20 hover:bg-card p-2 rounded-sm group">
                                                            <span className="text-xs text-gray-500 group-hover:text-primary">
                                                                {day.dayName}
                                                            </span>
                                                            <span
                                                                className={`text-sm ${false ? "text-blue-600 font-semibold" : "text-gray-400"} group-hover:text-primary`}
                                                            >
                                                                {day?.day}
                                                            </span>
                                                        </div>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full max-w-[300px] bg-background">
                                                        <div className="w-full min-w-[300px]">
                                                            {
                                                                day.modules.map(md => <p>{md.title}</p>)
                                                            }
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </th>
                                        ))}
                                        <th className="text-center p-4 font-medium text-muted-foreground min-w-[100px]">
                                            Statistika
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores?.map((student) => {
                                        return (
                                            <tr
                                                key={student.id}
                                                className="border-b hover:bg-secondary/40"
                                            >
                                                <td className="sticky left-0 border-r">
                                                    <div className="font-medium pl-2">
                                                        {student.full_name}
                                                    </div>
                                                </td>
                                                {sector.map((day) => {
                                                    const scr = student.modules.filter(g => g.target_date === day.formatted_date)
                                                    return (
                                                        <td
                                                            key={day.day}
                                                            className="p-2 text-center border-r"
                                                        >
                                                            <div className="flex justify-around items-center" style={{ minWidth: 30, minHeight: 30 }}>
                                                                {
                                                                    scr.map(md => (
                                                                        <NumberInput
                                                                            key={md.id + day.day}
                                                                            className={cn(
                                                                                "w-8 h-8 rounded-lg flex items-center text-center justify-center mx-auto border-none border-transparent shadow-none p-0",
                                                                                md.score == 0 ? "text-transparent" : ""
                                                                            )}
                                                                            max={9}
                                                                            defaultValue={md.score}
                                                                            maxLength={1}
                                                                        />
                                                                    ))
                                                                }
                                                                {/* <NumberInput
                                                                    className={cn(
                                                                        "w-8 h-8 rounded-lg flex items-center text-center justify-center mx-auto border-none border-transparent shadow-none p-0",
                                                                        scr == 0 ? "text-transparent" : ""
                                                                    )}
                                                                    max={9}
                                                                    defaultValue={scr}
                                                                    maxLength={1}
                                                                /> */}
                                                            </div>
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
