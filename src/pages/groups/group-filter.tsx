import { ParamCombobox } from "@/components/as-params/combobox"
import ParamInput from "@/components/as-params/input"
import { ParamMultiCombobox } from "@/components/as-params/multi-combobox"
import {
    OPTION_COURSES,
    OPTION_ROOMS,
    OPTION_TEACHERS,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { weekdays } from "@/lib/utils"

export default function GroupFilter() {
    const { data: courses } = useGet<Options[]>(OPTION_COURSES)
    const { data: teachers } = useGet<Options[]>(OPTION_TEACHERS)
    const { data: rooms } = useGet<Options[]>(OPTION_ROOMS)

    return (
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-2 ">
            <ParamInput fullWidth />
            <ParamCombobox
                isSearch={false}
                label="Kurslar"
                className="w-full"
                options={courses ?? []}
                paramName="course"
                labelKey="name"
                valueKey="id"
            />
            <ParamMultiCombobox
                hideSeach
                label="Kunlar"
                className="w-full"
                options={weekdays.map((d, i) => ({
                    value: `${i + 1}`,
                    name: d,
                }))}
                labelKey="name"
                valueKey="value"
                paramName="shift"
            />
            <ParamCombobox
                isSearch={false}
                label="O'qituvchi"
                className="w-full"
                options={teachers ?? []}
                labelKey="full_name"
                valueKey="id"
                paramName="teacher"
            />
            <ParamCombobox
                isSearch={false}
                label="Holat"
                className="w-full"
                options={[
                    {
                        label: "Barchasi",
                        value: "all",
                    },
                    {
                        label: "Faol",
                        value: "active",
                    },
                ]}
                paramName="status"
            />
        </div>
    )
}
