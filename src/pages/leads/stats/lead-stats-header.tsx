import ParamDateRangePicker from "@/components/as-params/date-range-picker"
import LeadsTab from "../leads-tab"
import LeadDealSelector from "../lead-deal-selector"

export function DashboardHeader() {
    return (
        <header className="pb-4">
            <div className="flex lg:items-center justify-between flex-col items-start lg:flex-row gap-2">
                <LeadsTab />

                <div className="flex  items-center gap-3 md:w-max w-full">
                    <ParamDateRangePicker
                        toParamName="end_date"
                        fromParamName="start_date"
                        showToday
                        showYesterday
                        showLastWeek
                        showLastMonth
                    />

                    <LeadDealSelector />
                </div>
            </div>
        </header>
    )
}
