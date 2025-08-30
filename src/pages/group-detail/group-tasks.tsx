import { Card, CardContent } from "@/components/ui/card"
import SectionHeader from "@/components/elements/section-header"
import { formatDateToUz, moduleGroupper } from "@/lib/utils"
import { useParams, useSearch } from "@tanstack/react-router"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ExamDetail from "./exam-detail"
import GroupTabs from "./group-tab"
import DeleteModal from "@/components/custom/delete-modal"
import { useGet } from "@/hooks/useGet"
import { useEffect, useMemo, useRef, useState } from "react"
import { formatDate } from "date-fns"
import { ParamCombobox } from "@/components/as-params/combobox"
import TaskCard from "./task-card"
import { useStore } from "@/hooks/use-store"
import { groupDefaultDate } from "./utils"
import { apiGroupDays } from "@/services/hooks/use-group-students"
import MonthNavigator from "@/components/as-params/month-navigator"
import useQueryParams from "@/hooks/use-query-params"

export default function GroupTasks() {
    const { id: group } = useParams({ strict: false })
    const { date } = useSearch({ strict: false })
    const { store, remove } = useStore<GroupModule>("item")
    const [isScroll, setIsScroll] = useState(0)
    const { updateParams } = useQueryParams()

    const refMap = useRef<Record<string, HTMLDivElement | null>>({})

    const { data: options } = useGet<string[]>(
        "platform/groups/months-to-teach/" + group,
    )

    const months = useMemo(
        () =>
            options?.map((d) => ({
                value: d,
                label: formatDateToUz(d),
            })) ?? [],
        [options],
    )

    const defaultOpt = groupDefaultDate(months)

    const { data: modules, refetch } = useGet<GroupModule[]>(
        "platform/groups/modules",
        {
            params: {
                group,
                module_date: date,
            },
            options: {
                enabled: !!date,
            },
        },
    )


    const { data: days } = apiGroupDays(group, date)

    const grouppedModules = useMemo(() => {
        if (isScroll == 0) {
            setIsScroll(1)
        }
        return moduleGroupper(modules, days?.map(d => d.date))
    }, [modules, days])

    useEffect(() => {
        if (isScroll === 1 && grouppedModules) {
            const item2 = grouppedModules.findIndex(
                (s) => s.date.slice(0, 10) == "2025-08-22",
            )

            const target = refMap.current[item2]

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                })
                setIsScroll(3)
            }
        }
    }, [isScroll, grouppedModules])

    useEffect(() => {
        if (defaultOpt?.value || !!date) {
            updateParams({
                date: date ?? defaultOpt?.value
            })
        }
    }, [defaultOpt, date])

    return (
        <div className="w-full">
            <div className="max-w-full mx-auto h-full">
                <SectionHeader
                    title="Vazifalar"
                    rightComponent={
                        date && (
                            <MonthNavigator
                                months={months}
                                value={date}
                                onChange={(date) => updateParams({ date })}
                            />
                        )
                    }
                />
                <Card className="grid md:grid-cols-2">
                    <CardContent className="p-0">
                        <ScrollArea className="max-h-[65vh] overflow-y-auto no-scrollbar">
                            <div className="flex flex-col gap-2 md:pr-5">
                                {grouppedModules?.map((item, i) => (
                                    <div
                                        key={i}
                                        ref={(el) =>
                                            (refMap.current[i.toString()] = el)
                                        }
                                    >
                                        <TaskCard item={item} />
                                    </div>
                                ))}
                            </div>
                            <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                            />
                        </ScrollArea>
                    </CardContent>
                    <CardContent className="flex flex-col gap-5 py-0 px-3">
                        <ExamDetail />
                    </CardContent>
                </Card>

                <DeleteModal
                    id={store?.id}
                    path="platform/groups/modules"
                    onSuccessAction={remove}
                />
            </div>

            <GroupTabs refetch={refetch} />
        </div>
    )
}
