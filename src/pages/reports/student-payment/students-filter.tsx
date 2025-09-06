import { ParamCombobox } from "@/components/as-params/combobox"
import ParamDateRangePicker from "@/components/as-params/date-range-picker"
import { buttonVariants } from "@/components/ui/button"
import useMe from "@/hooks/useMe"
import { months, optionYears } from "@/lib/utils"
import { useSearch } from "@tanstack/react-router"
import LeadsDepartmentFilter from "./leads-department-filter"

export default function ReportsFilter() {
    const { tabs } = useSearch({ from: "__root__" })
    const { data, active_branch } = useMe()

    const branch = data?.branches?.find((b) => b.id === active_branch)

    const defaultOpt = branch
        ? {
              id: branch.id,
              name: branch.name,
              start_time: branch.start_time,
              end_time: branch.end_time,
          }
        : undefined

    return (
        <aside className="flex items-center gap-2 rounded-md ">
            {tabs !== "attendance" && (
                <>
                    <ParamCombobox
                        dontAllowClear
                        paramName="month"
                        options={months}
                        isSearch={false}
                        valueKey="key"
                        labelKey="name"
                        label="Oy"
                        className="w-full"
                        addButtonProps={{
                            className: "!bg-background dark:!bg-secondary",
                        }}
                    />
                    <ParamCombobox
                        dontAllowClear
                        paramName="year"
                        options={optionYears()}
                        isSearch={false}
                        label="Yil"
                        className="w-full"
                        addButtonProps={{
                            className: "!bg-background dark:!bg-secondary",
                        }}
                    />
                </>
            )}
            <ParamDateRangePicker
                itemClassName={buttonVariants({
                    variant: "ghost",
                    className:
                        "rounded-sm gap-2 dark:text-gray-400 text-gray-500 !bg-background dark:!bg-secondary",
                })}
                placeholder="Sana bo'yicha"
                className="p-0"
                fromParamName={"start_date"}
                toParamName={"end_date"}
            />

            <ParamCombobox
                dontAllowClear
                defaultOpt={defaultOpt}
                paramName="branch"
                options={data?.branches ?? []}
                labelKey="name"
                valueKey="id"
                isSearch={false}
                label="Filial"
                className="whitespace-nowrap"
                addButtonProps={{
                    className: "!bg-background dark:!bg-secondary",
                }}
            />
            {tabs === "leads_statistic" && <LeadsDepartmentFilter />}
            {/* <ExportAsExcel url="url" name="reports" /> */}
        </aside>
    )
}
