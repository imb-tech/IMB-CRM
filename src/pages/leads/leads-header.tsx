import ParamInput from "@/components/as-params/input"
import LeadDealSelector from "./lead-deal-selector"

export default function LeadsHeader() {
    return (
        <div className="flex items-center gap-3 sm:w-max w-full">
            <ParamInput />
            <LeadDealSelector />
        </div>
    )
}
