import { formatMoney } from "@/lib/format-money"

export default function Money({
    value,
    suffix = false,
}: {
    value: number
    suffix?: boolean
}) {
    return (
        <div>
            {formatMoney(
                value,
                value >= 0 ? "text-green-500" : "text-red-500",
                suffix ? "so'm" : undefined,
            )}
        </div>
    )
}
