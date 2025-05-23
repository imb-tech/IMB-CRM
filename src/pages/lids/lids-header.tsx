import { ParamCombobox } from "@/components/as-params/combobox"
import { LidsAction } from "./lids-action"
import ParamInput from "@/components/as-params/input"

export default function LidsHeader() {
    const sections = [
        {
            id: 1,
            name: "Kiberxavfsizlik uchun",
        },
        {
            id: 2,
            name: "Ingiliz tili yangi",
        },
    ]

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
                <ParamCombobox
                    options={sections}
                    labelKey="name"
                    returnVal="id"
                    valueKey="id"
                    paramName="section"
                    label="Bo'limni tanlang"
                    className="min-w-60"
                />
                <LidsAction />
            </div>
            <ParamInput />
        </div>
    )
}
