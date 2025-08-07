import { ClassNameValue } from "tailwind-merge"

export function formatMoney(
    amount?: number | string,
    className?: ClassNameValue,
    suffix = "",
) {
    const [integerPart, decimalPart] =
        amount ? amount.toString().split(".") : ""
    const newIntegerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    if (amount) {
        if (decimalPart && +decimalPart > 0) {
            return (
                <span className={`${className} text-nowrap`}>
                    {newIntegerPart}.{decimalPart} {suffix}
                </span>
            )
        } else {
            return (
                <span className={`${className} text-nowrap`}>
                    {newIntegerPart} {suffix}
                </span>
            )
        }
    } else {
        return (
            <span className={`${className} text-nowrap`}>
                0 {suffix ? " so'm" : ""}
            </span>
        )
    }
}
