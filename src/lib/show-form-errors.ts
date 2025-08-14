import { UseFormReturn } from "react-hook-form";

export default function showFormErrors(err: any, form: UseFormReturn<any>) {
  for (const [k, v] of Object.entries(err?.response?.data)) {
    if (k !== "msg") {
      form.setError(k as any, {
        type: "validate",
        message: v as string,
      })
    }
  }
}
