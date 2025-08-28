import { UseFormReturn } from "react-hook-form"
import { toast } from "sonner"

export default function showFormErrors(err: any, form: UseFormReturn<any>) {
  if (err.status !== 0 && Number(err.status) < 450 && !err?.response?.data?.msg) {
    const fields = form.getValues()
    let hasValidFieldError = false

    for (const [k, v] of Object.entries(err?.response?.data)) {
      if (k !== "msg") {
        const isFieldExist = k in fields || k.includes(".")

        if (isFieldExist) {
          hasValidFieldError = true
          form.setError(k as any, {
            type: "validate",
            message: v as string,
          })
        }
      }
    }

    if (!hasValidFieldError) {
      toast.error(
        err?.response?.data?.msg || "Noto'g'ri ma'lumotlar yuborildi"
      )
    }
  } else {
    toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
  }
}
