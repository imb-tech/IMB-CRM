import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function onError(err: any) {
    if (err?.response?.data?.msg && err.status !== 500) {
        const arrayErrors = Object.entries(err?.response?.data || {})
        if (arrayErrors.length > 0) {
            toast.error(
                arrayErrors.map(([_, value]) => String(value)),
                { duration: 5000 },
            )
        } else {
            toast.error(err?.message, { duration: 5000 })
        }
    }
}
