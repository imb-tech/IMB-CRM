import { ParamCombobox } from "@/components/as-params/combobox"
import ParamDateRangePicker from "@/components/as-params/date-range-picker"
import ExportAsExcel from "@/components/custom/export-excel"
import { buttonVariants } from "@/components/ui/button"
import { useGet } from "@/hooks/useGet"
import useMe from "@/hooks/useMe"
import { months, optionYears } from "@/lib/utils"
import { pipelineUrl } from "@/pages/leads/lead-deal-selector"
import { useSearch } from "@tanstack/react-router"

export default function ReportsFilter() {
    const { tabs } = useSearch({ from: "__root__" })
    const { data, active_branch } = useMe()

    const { data: dataLeadDepartment } = useGet<Pipeline[]>(pipelineUrl, {
        params: { is_active: true },
    })

    return (
        <aside className="flex items-center gap-2 rounded-md">
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
            {tabs === "leads_statistic" && (
                <ParamCombobox
                    dontAllowClear
                    defaultOpt={dataLeadDepartment?.[0]}
                    paramName="pipeline"
                    options={dataLeadDepartment ?? []}
                    labelKey="name"
                    valueKey="id"
                    isSearch={false}
                    label="Varonkalar"
                />
            )}
            <ExportAsExcel url="url" name="reports" />
        </aside>
    )
}
