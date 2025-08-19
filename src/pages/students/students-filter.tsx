import { ParamCombobox } from "@/components/as-params/combobox"
import ParamInput from "@/components/as-params/input"
import {
    OPTION_COURSES,
    OPTION_GROUPS,
    OPTION_TEACHERS,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useState } from "react"
import { studentStatusKeys } from "./student-status"

export default function StudentsFilter() {
    const [search, setSearch] = useState<{
        course: string
        group: string
        teacher: string
    }>({
        course: "",
        group: "",
        teacher: "",
    })
    const { data: dataCourse, isFetching: isFetchingCourse } = useGet<
        { id: number; name: string }[]
    >(OPTION_COURSES, {
        params: { search: search.course },
    })

    const { data: dataGroup, isFetching: isFetchingGroup } = useGet<Group[]>(
        OPTION_GROUPS,
        {
            params: { search: search.group },
        },
    )

    const { data: dataTeacher, isFetching: isFetchingTeacher } = useGet<
        { id: number; full_name: string }[]
    >(OPTION_TEACHERS, {
        params: { search: search.teacher },
    })

    const handleSearchValue = (key: string, value: string) => {
        setSearch((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    return (
        <div className="grid lg:grid-cols-6 md:grid-cols-2 gap-2 items-center">
            <ParamInput fullWidth />
            <ParamCombobox
                label="Kurslar"
                className="w-full"
                options={dataCourse || []}
                labelKey="name"
                valueKey="id"
                paramName="course"
                isLoading={isFetchingCourse}
                onSearchChange={(e) => handleSearchValue("course", e)}
            />
            <ParamCombobox
                isSearch={false}
                label="Guruhdagi holati"
                options={Object.entries(studentStatusKeys)?.map(
                    ([id, name]) => ({ id, name }),
                )}
                labelKey="name"
                valueKey="id"
                paramName="group_students__status"
            />
            <ParamCombobox
                isSearch={false}
                label="To'lov holati"
                options={[
                    {
                        label: "Barchasi",
                        value: "0",
                    },
                    {
                        label: "Qarzdor",
                        value: "-1",
                    },
                    {
                        label: "Qarzi yo'q",
                        value: "1",
                    },
                    {
                        label: "Haqdor",
                        value: "2",
                    },
                ]}
                paramName="payment_status"
            />
            <ParamCombobox
                onSearchChange={(e) => handleSearchValue("group", e)}
                label="Guruh"
                className="w-full"
                options={
                    dataGroup?.map((item) => ({
                        name: `${item.name} - ${item.start_date} - ${item.end_date}`,
                        id: item.id,
                    })) || []
                }
                labelKey="name"
                valueKey="id"
                paramName="group"
                isLoading={isFetchingGroup}
            />
            <ParamCombobox
                onSearchChange={(e) => handleSearchValue("teacher", e)}
                label="Ustoz"
                className="w-full"
                options={dataTeacher || []}
                labelKey="full_name"
                valueKey="id"
                paramName="teacher"
                isLoading={isFetchingTeacher}
            />
        </div>
    )
}
