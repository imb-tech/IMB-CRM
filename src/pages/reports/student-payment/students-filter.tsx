import { ParamCombobox } from "@/components/as-params/combobox"
import ParamDateRangePicker from "@/components/as-params/date-range-picker"
import ExportAsExcel from "@/components/custom/export-excel"
import { buttonVariants } from "@/components/ui/button"
import useMe from "@/hooks/useMe"
import { months, optionYears } from "@/lib/utils"


export default function ReportsFilter() {
    const { data, active_branch } = useMe()
 
    return (
        <aside className="flex items-center gap-2 rounded-md">
            <ParamDateRangePicker
                itemClassName={buttonVariants({
                    variant: "ghost",
                    className:
                        "rounded-sm gap-2 !bg-background dark:!bg-secondary",
                })}
                placeholder="Sana bo'yicha"
                className="p-0"
            />
            <ParamCombobox
                dontAllowClear
                paramName="month"
                options={months}
                isSearch={false}
                valueKey="key"
                labelKey="name"
                label="Oy"
                className="w-full"
            />
            <ParamCombobox
                dontAllowClear
                paramName="year"
                options={optionYears()}
                isSearch={false}
                label="Yil"
                className="w-full"
            />
            <ParamCombobox
                dontAllowClear
                defaultOpt={{
                    id: active_branch,
                    name: data?.branches?.find((b) => b.id == active_branch)
                        ?.name,
                }}
                paramName="date"
                options={data?.branches ?? []}
                labelKey="name"
                valueKey="id"
                isSearch={false}
                label="Filial"
            />
            <ExportAsExcel url="url" name="reports" />
        </aside>
    )
}
