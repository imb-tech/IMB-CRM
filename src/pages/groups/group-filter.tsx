import { ParamCombobox } from "@/components/as-params/combobox"
import ParamInput from "@/components/as-params/input"
import { ParamMultiCombobox } from "@/components/as-params/multi-combobox"
import ParamSwtich from "@/components/as-params/switch"
import {
    OPTION_COURSES,
    OPTION_TEACHERS,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { weekdays } from "@/lib/utils"

export default function GroupFilter() {
    const { data: courses } = useGet<Options[]>(OPTION_COURSES)
    const { data: teachers } = useGet<Options[]>(OPTION_TEACHERS)

    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2 ">
            <ParamInput fullWidth />
            <ParamCombobox
                isSearch={false}
                label="Kurslar"
                options={courses ?? []}
                paramName="course"
                labelKey="name"
                valueKey="id"
            />
            <ParamMultiCombobox
                hideSearch
                label="Kunlar"
                options={weekdays.map((d, i) => ({
                    value: `${i}`,
                    name: d,
                }))}
                labelKey="name"
                valueKey="value"
                paramName="shift"
            />
            <div className="flex gap-2">
                <ParamCombobox
                    isSearch={false}
                    label="O'qituvchi"
                    options={teachers ?? []}
                    labelKey="full_name"
                    valueKey="id"
                    paramName="teacher"
                    addButtonProps={{ className: 'w-full' }}
                />
                <ParamSwtich paramName="is_active" label="Arxiv" reverse />
            </div>
        </div>
    )
}
