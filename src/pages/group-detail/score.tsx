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
import { Plus } from "lucide-react"
import { useModal } from "@/hooks/useModal"
import { useStore } from "@/hooks/use-store"
import GroupTabs from "./group-tab"
import { Button } from "@/components/ui/button"
import { moduleTypeLabel } from "./task-card"

export default function GroupScore() {
    const { id } = useParams({ from: "/_main/groups/$id/_main/score" })
    const { date, is_active } = useSearch({ from: "/_main/groups/$id/_main/score" })

    const { openModal } = useModal("day")
    const { setStore: setType } = useStore<string>("day")
    const { setStore } = useStore("item")

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

    const { data: scores, refetch } = useGet<StudentScore[]>(
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
                                        {sector.map((day, i) => {
                                            const modules = day.modules.filter(t => t.type !== "topic")
                                            return (
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
                                                        <PopoverContent className={cn("w-full bg-background", !modules.length && "px-1 py-2")}>
                                                            <div className={cn("w-full min-w-[300px] max-w-[300px] flex flex-col gap-3", !modules.length && "min-w-12")}>
                                                                {modules.map(md => (
                                                                    <div key={md.id} className={"flex flex-col items-start"}>
                                                                        <p
                                                                            className={cn("text-primary/80 bg-primary/10 text-xs uppercase py-0.5 px-2 rounded-sm rounded-bl-none", md.type == "exam" && "text-sky-500/80 bg-sky-500/10")}
                                                                        >
                                                                            {moduleTypeLabel[md.type]}
                                                                        </p>
                                                                        <p className="font-extralight pl-2 border-l ml-[0.5px] text-sm">{md.title}</p>
                                                                    </div>
                                                                ))}
                                                                <div
                                                                    className={cn("flex items-center justify-center gap-2 flex-col w-full", modules.length && "flex-row justify-start")}
                                                                >
                                                                    <Button
                                                                        onClick={() => {
                                                                            setType("task")
                                                                            setStore({ date: day.date })
                                                                            openModal()
                                                                        }}
                                                                        size="sm"
                                                                    >
                                                                        <Plus size={18} />
                                                                        <p className="text-xs">Vazifa</p>
                                                                    </Button>
                                                                    <Button
                                                                        className="border-sky-500 bg-sky-500/20 text-sky-500 hover:bg-sky-500/30 hover:text-sky-500"
                                                                        onClick={() => {
                                                                            setType("exam")
                                                                            setStore({ date: day.date })
                                                                            openModal()
                                                                        }}
                                                                        size="sm"
                                                                    >
                                                                        <Plus size={18} />
                                                                        <p className="text-xs">Imtixon</p>
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores?.map((student) => {
                                        return (
                                            <tr
                                                key={student.id}
                                                className="border-b hover:bg-secondary/40"
                                            >
                                                <td className="sticky left-0 border-r bg-card">
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
                                                            <div className="flex justify-around items-center gap-2" style={{ minWidth: 30, minHeight: 30 }}>
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

            <GroupTabs refetch={refetch} />
        </div>
    )
}
