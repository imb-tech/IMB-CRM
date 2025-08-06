import { ParamCombobox } from "@/components/as-params/combobox"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import useLeadPipeline from "../use-lead-pipeline"
import LeadsTab from "../leads-tab"
import ParamDateRangePicker from "@/components/as-params/date-range-picker"

export function DashboardHeader() {
    const { data } = useLeadPipeline({})

    return (
        <header className="pb-4">
            <div className="flex md:items-center justify-between flex-col items-start md:flex-row gap-2">
                <LeadsTab />

                <div className="flex items-center gap-3">
                    <ParamDateRangePicker
                        toParamName="end_date"
                        fromParamName="start_date"
                        showToday
                        showYesterday
                        showLastWeek
                        showLastMonth
                    />
                    <ParamCombobox
                        className="min-w-[200px] hidden sm:flex"
                        paramName="pipeline"
                        label="Bo'lim"
                        options={data ?? []}
                        valueKey="id"
                        labelKey="name"
                    />
                    <Button size="sm" className="gap-2 hidden">
                        <Bell className="h-4 w-4" />
                        Bildirishnomalar
                    </Button>
                </div>
            </div>
        </header>
    )
}
