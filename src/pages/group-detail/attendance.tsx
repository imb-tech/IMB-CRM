import { Card, CardContent } from "@/components/ui/card"
import { useParams, useSearch } from "@tanstack/react-router"
import { useEffect, useMemo } from "react"
import SectionHeader from "@/components/elements/section-header"
import { useGet } from "@/hooks/useGet"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import { AttendanceSelect } from "./attendance-select"
import AttendanceFooter from "./attendance-footer"
import { cn, formatDateToUz } from "@/lib/utils"
import ParamSwtich from "@/components/as-params/switch"
import useQueryParams from "@/hooks/use-query-params"
import MonthNavigator from "@/components/as-params/month-navigator"
import { apiGroupDays, useGroupMonths } from "@/services/hooks/use-group-students"
import { getGroupSector, groupDefaultDate } from "./utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { moduleTypeLabel } from "./task-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useModal } from "@/hooks/useModal"
import { useStore } from "@/hooks/use-store"
import GroupTabs from "./group-tab"

export default function GroupAttendance() {
    const { id } = useParams({
        from: "/_main/groups/$id/_main/attendance",
    })
    const { updateParams } = useQueryParams()
    const { date, is_active } = useSearch({
        strict: false,
    })

    const { openModal } = useModal("day")
    const { setStore: setType } = useStore<string>("day")
    const { setStore } = useStore("item")

    const { data: options } = useGroupMonths(id)

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
                refetchOnMount: true
            },
            params: {
                is_active: typeof is_active == "boolean" ? is_active : true,
            },
        },
    )

    const defaultOpt = groupDefaultDate(months)
    const { data: days, refetch } = apiGroupDays(id, date)
    const sector = getGroupSector(days)

    useEffect(() => {
        if (defaultOpt?.value || !!date) {
            updateParams({
                date: date ?? defaultOpt?.value
            })
        }
    }, [defaultOpt, date])

    return (
        <div className="pt-1">
            <SectionHeader
                title="Oylik yo'qlama jadvali"
                className="items-stretch md:items-start"
                rightComponent={
                    <div className="flex items-center gap-2 flex-row justify-between md:justify-between md:flex-row bg-red-">
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
                    <div className="overflow-x-auto !rounded-sm">
                        <table className="w-full md:min-w-full" style={{ maxWidth: (sector.length * 40) + 160 }}>
                            <thead>
                                <tr className="bg-secondary">
                                    <th className="text-left pl-2 font-medium sticky left-0 bg-secondary min-w-[160px] w-[160px] border-b border-b-background">
                                        O'quvchi
                                    </th>
                                    {sector.map((day, i) => {
                                        const theme = day.modules.filter(t => t.type == "topic")
                                        return (
                                            <th
                                                key={i}
                                                className="text-center font-medium text-gray-700 min-w-[40px]"
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
                                                    <PopoverContent className={cn("w-full bg-background", !theme.length && "px-1 py-2")}>
                                                        <div className={cn("w-full min-w-[300px] max-w-[300px] flex flex-col gap-3", !theme.length && "min-w-12")}>
                                                            {theme.map(md => (
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
                                                                className={cn("flex items-center justify-center gap-2 flex-col w-full", theme.length && "flex-row justify-start")}
                                                            >
                                                                <Button
                                                                    onClick={() => {
                                                                        setType("topic")
                                                                        setStore({ date: day.date })
                                                                        openModal()
                                                                    }}
                                                                    size="sm"
                                                                >
                                                                    <Plus size={18} />
                                                                    <p className="text-xs">Mavzu</p>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </th>
                                        )
                                    })}
                                    <th className="text-center p-4 font-medium text-muted-foreground min-w-[100px] sticky right-0 bg-secondary">
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
                                                    student.attendances?.find(
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
                                                                        : 3
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
                                            <td className="p-1 text-center sticky right-0 bg-card">
                                                <div className="space-y-1">
                                                    <div className="text-sm font-semibold">
                                                        {statistics?.all}
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

            <GroupTabs refetch={refetch} />
        </div>
    )
}
