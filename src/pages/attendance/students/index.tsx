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
import { useStore } from "@/hooks/use-store"
import AccordionSkeleton from "@/components/custom/accordion-skeletion"
import EmptyBox from "@/components/custom/empty-box"

export default function StudentsAttendanceMain() {
    const navigate = useNavigate()
    const search = useSearch({ from: "/_main/reports/" })
    const { openModal, closeModal, isOpen } = useModal("attendance-modal")
    const { updateParams } = useQueryParams()
    const { setStore } = useStore<AttendancGroupDetail>("attendance-personal")

    const { group, status, tabs, page, page_size, ...res } = search

    const {
        data: attendanceData,
        isLoading,
        isSuccess,
    } = useGet<AttendanceData>(ATTENDANCE_STATIS, { params: res })
    const paramPage = !isOpen
        ? { page, page_size }
        : { page: undefined, page_size: undefined }

    const { data: attendanceDataDetails } = useGet<
        ListResp<AttendancGroupDetail>
    >(`${ATTENDANCE_STATIS}/${group}`, {
        params: { ...res, ...paramPage },
        options: { enabled: !!group && !isOpen },
    })

    const handleAccordionChange = React.useCallback(
        (value: string) => {
            navigate({
                to: "/reports",
                search: (prev) => ({
                    ...prev,
                    group: prev.group === value ? undefined : value,
                    page: undefined,
                    page_size: undefined,
                }),
            })
            closeModal()
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
                    {isLoading && (
                        <div className="mt-3">
                            <AccordionSkeleton columnCount={8} rowCount={6} />
                        </div>
                    )}
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
                                    <AccordionTrigger className="p-2">
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
                                                    updateParams({
                                                        page: undefined,
                                                        page_size: undefined,
                                                    })
                                                    if (item?.id) {
                                                        setStore(item)
                                                        openModal()
                                                    }
                                                }}
                                                paginationProps={{
                                                    totalPages:
                                                        attendanceDataDetails?.total_pages,
                                                }}
                                                minRows={6}
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}

                    {isSuccess && attendanceData?.groups?.length === 0 && (
                        <div className="rounded-md bg-card mt-3">
                            <EmptyBox />
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Personal Sheet */}
            <div>
                <SheetDemo />
            </div>
        </div>
    )
}
