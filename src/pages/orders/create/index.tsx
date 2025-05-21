import ParamTabs from "@/components/as-params/tabs"
import BulkCargo from "./bulk-cargo"
import WholeLoad from "./whole-load"

const tab = [
    {
        value: "bulk_cargo",
        label: "Yig'ma yuk",
        content: <BulkCargo />,
    },
    {
        value: "whole_load",
        label: "Butun yuk",
        content: <WholeLoad />,
    },
]

function OrderCreate() {
    return (
        <div className="mb-5 w-full">
            <ParamTabs options={tab} paramName="cargo_type" />
        </div>
    )
}

export default OrderCreate
