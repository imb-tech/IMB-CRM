import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import StudentAttendance from "./stats"
import { SheetDemo } from "./attendance-personal"
import { useModal } from "@/hooks/useModal"
import { useGet } from "@/hooks/useGet"
import {
    ATTENDANCE_STATIS,
    ATTENDANCE_STATIS_STUDENTS,
} from "@/constants/api-endpoints"
import { useNavigate, useSearch } from "@tanstack/react-router"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import StudentAttendanceGroupHeader from "./group"
import StudentGroupHeaderName from "./group-header"
import { DataTable } from "@/components/ui/datatable"
import { useCols } from "./cols"
import useQueryParams from "@/hooks/use-query-params"

export default function StudentsAttendanceMain() {
    const navigate = useNavigate()
    const search = useSearch({ from: "/_main/reports" })
    const { openModal } = useModal()
    const { toggleParam } = useQueryParams()

    const { group, group_student, ...res } = search

    const { data: attendanceData, isLoading } = useGet<AttendanceData>(
        ATTENDANCE_STATIS,
        { params: res },
    )

    const { data: attendanceDataDetails } = useGet<
        ListResp<AttendancGroupDetail>
    >(`${ATTENDANCE_STATIS}/${group}`, {
        params: res,
        options: { enabled: !!group },
    })

    const { data: attendanceGroupStudents } = useGet<
        ListResp<AttendanceRecord>
    >(ATTENDANCE_STATIS_STUDENTS, {
        params: search,
        options: { enabled: !!group_student },
    })

    const handleAccordionChange = React.useCallback(
        (value: string) => {
            navigate({
                to: "/reports",
                search: (prev) => ({
                    ...prev,
                    group: prev.group_student === value ? undefined : value,
                }),
            })
        },
        [navigate],
    ) 

    const columns = useCols()

    return (
        <div className="w-full flex flex-col gap-3">
            {/* Main Cards */}
            <div className="bg-background p-3 rounded-md dark:bg-card">
                <StudentAttendance cards={attendanceData?.main_cards} />
            </div>

            {/* Group Accordion */}
            <Card>
                <CardContent>
                    <StudentGroupHeaderName />
                    {attendanceData?.groups && (
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            value={group ?? undefined}
                            onValueChange={handleAccordionChange}
                        >
                            {attendanceData.groups.map((item) => (
                                <AccordionItem
                                    key={item.group_student__group__id}
                                    value={item.group_student__group__id.toString()}
                                >
                                    <AccordionTrigger className="px-2">
                                        <StudentAttendanceGroupHeader
                                            data={item}
                                        />
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance pl-3">
                                        <div className="mt-3">
                                            <DataTable
                                                numeration
                                                columns={columns}
                                                data={
                                                    attendanceDataDetails?.results ||
                                                    []
                                                }
                                                loading={isLoading}
                                                onRowClick={(item) => {
                                                    if (item.id) {
                                                        toggleParam(
                                                            "group_student",
                                                            item.id,
                                                        )
                                                        openModal()
                                                    }
                                                }}
                                                paginationProps={{
                                                    totalPages:
                                                        attendanceDataDetails?.total_pages,
                                                }}
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </CardContent>
            </Card>

            {/* Personal Sheet */}
            <div>
                <SheetDemo data={attendanceGroupStudents} />
            </div>
        </div>
    )
}
