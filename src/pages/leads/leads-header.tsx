import ParamInput from "@/components/as-params/input"
import LeadDealSelector from "./lead-deal-selector"

export default function LeadsHeader() {
    return (
        <div className="flex items-center justify-between md:justify-end gap-3  w-full">
            <LeadDealSelector />
            <div className="sm:w-1/4">
                <ParamInput fullWidth />
            </div>
        </div>
    )
}
