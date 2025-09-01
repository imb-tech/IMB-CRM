import ParamInput from "@/components/as-params/input"

export default function LeadsHeader() {
    return (
        <div className="flex items-center justify-end gap-3  w-full">
            <div className="sm:w-1/4">
                <ParamInput fullWidth />
            </div>
        </div>
    )
}
