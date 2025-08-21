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

export default function GroupTasks() {
    const { id: group } = useParams({ strict: false })
    const { date, id } = useSearch({ strict: false })
    const { store } = useStore<GroupModule>("item")
    const [isScroll, setIsScroll] = useState(0)

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

    const currDate = formatDate(new Date().setDate(1), "yyyy-MM-dd")

    const defaultOpt = useMemo(
        () =>
            months?.length ?
                (months?.find((usr) => usr.value === currDate) ?? months[0])
            :   null,
        [months],
    )

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

    const { data: days } = useGet<string[]>(
        "platform/groups/days-to-teach/" + group + "/" + date,
        {
            options: {
                enabled: !!date,
            },
        },
    )

    const grouppedModules = useMemo(() => {
        if (isScroll == 0) {
            setIsScroll(1)
        }
        return moduleGroupper(modules, days)
    }, [modules, days])

    useEffect(() => {
        if (isScroll === 1 && grouppedModules) {
            const item2 = grouppedModules.findIndex(
                (s) => s.date.slice(0, 10) == "2025-08-20",
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

    return (
        <div className="w-full">
            <div className="max-w-full mx-auto h-full">
                <SectionHeader
                    title="Vazifalar"
                    rightComponent={
                        defaultOpt && (
                            <ParamCombobox
                                dontAllowClear
                                paramName="date"
                                defaultOpt={defaultOpt}
                                options={months}
                                isSearch={false}
                                label="Oy bo'yicha"
                                className="w-[160px]"
                            />
                        )
                    }
                />
                <Card className="grid grid-cols-2 ">
                    <CardContent className="p-0">
                        <ScrollArea className="max-h-[65vh] overflow-y-auto no-scrollbar">
                            <div className="flex flex-col gap-2 pr-5">
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

                <DeleteModal id={store?.id} path="platform/groups/modules" />
            </div>

            <GroupTabs refetch={refetch} />
        </div>
    )
}
