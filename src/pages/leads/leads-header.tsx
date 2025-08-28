import ParamInput from "@/components/as-params/input"
import LeadsTab from "./leads-tab"
import LeadDealSelector from "./lead-deal-selector"

export default function LeadsHeader() {

    return (
        <div className="flex items-center sm:flex-row flex-col gap-3 md:justify-between">
            <LeadsTab />
            <div className="flex items-center gap-3 sm:w-max w-full">
                <ParamInput />
                <LeadDealSelector />
            </div>
        </div>
    )
}
