import { useGet } from "@/hooks/useGet"
import { FormProvider, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { PublicForm } from "./public-form"
import { useParams } from "@tanstack/react-router"

export default function FormDetail() {
    const { id } = useParams({ from: "/form/$id" })
    const { data, isSuccess } = useGet<FormConfig>(`leads/forms/public/${id}`, {
        options: {
            refetchOnMount: true,
        },
    })
    const [isv, setIsv] = useState<boolean>(false)
    const form = useForm()

    useEffect(() => {
        if (isSuccess) {
            form.reset(data)
            setIsv(true)
        }
    }, [data])

    return <FormProvider {...form}>{isv && <PublicForm />}</FormProvider>
}
