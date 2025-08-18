import { ParamCombobox } from "@/components/as-params/combobox"
import ParamDateRangePicker from "@/components/as-params/date-range-picker"
import { buttonVariants } from "@/components/ui/button"
import useMe from "@/hooks/useMe"
import { months, optionYears } from "@/lib/utils"
import { useSearch } from "@tanstack/react-router"

export default function ReportsFilter() {
    const { data, active_branch } = useMe()
    const search = useSearch({ strict: false })

    const isDay = !search.tabs || search.tabs !== "student_payments"

    return (
        <aside className="flex items-center gap-1 rounded-md">
            <ParamDateRangePicker
                showToday={isDay}
                showYesterday={isDay}
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
                className="!bg-background dark:!bg-secondary w-24"
            />

            <ParamCombobox
                dontAllowClear
                paramName="year"
                options={optionYears()}
                isSearch={false}
                label="Yil"
                className="!bg-background dark:!bg-secondary"
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
                className="w-[160px] rounded-sm !bg-background dark:!bg-secondary hidden"
            />
        </aside>
    )
}
