import { UseFormReturn } from "react-hook-form"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleFormError(err: any, form?: UseFormReturn<any>) {
  const isClientError = err?.status !== 0 && Number(err?.status) < 500
  const data = err?.response?.data || {}
  const msg = data?.msg

  let hasValidFieldError = false

  if (form && isClientError) {
    const fields = form.getValues()

    for (const [key, value] of Object.entries(data)) {
      if (key !== "msg") {
        const isFieldExist = key in fields || key.includes(".")
        if (isFieldExist) {
          hasValidFieldError = true
          form.setError(key as any, {
            type: "validate",
            message: value as string,
          })
        }
      }
    }

    if (!hasValidFieldError && msg) {
      toast.error(msg)
    }
  } else if (isClientError && msg) {
    const arrayErrors = Object.entries(data).filter(([key]) => key !== "msg")
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors.map(([_, value]) => String(value)).join("\n"), {
        duration: 5000,
      })
    } else {
      toast.error(msg, { duration: 5000 })
    }
  } else {
    toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.")
  }
}
