import ParamInput from "@/components/as-params/input"
import LeadsTab from "./leads-tab"

export default function LeadsHeader() {
    return (
        <div className="flex items-center gap-3 justify-between">
            <LeadsTab />
            <ParamInput />
        </div>
    )
}
