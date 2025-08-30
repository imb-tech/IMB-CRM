import { useGet } from "@/hooks/useGet"
import { pipelineUrl } from "../lead-deal-selector"
import useMe from "@/hooks/useMe"
import { useForm } from "react-hook-form"
import { useCallback, useEffect } from "react"
import { toast } from "sonner"
import { useModal } from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { usePost } from "@/hooks/usePost"
import { handleFormError } from "@/lib/show-form-errors"
import { FormCombobox } from "@/components/form/combobox"
import { Button } from "@/components/ui/button"
import { useParams } from "@tanstack/react-router"
import { useStore } from "@/hooks/use-store"

type FormValues = {
    branch: number
    department: string
    status: number | null
}

const LeadsUpdateDepartment = () => {
    const { store } = useStore<Lead>("lead-data")
    const { id } = useParams({ from: "/_main/leads/varonka/$id/" })
    const queryClient = useQueryClient()
    const { closeModal } = useModal("update-department")
    const { data: dataLeadDepartment } = useGet<Pipeline[]>(pipelineUrl, {
        params: { is_active: true },
    })

    const queryKeyUsers = ["leads/crud", ...Object.values({ pipeline: id })]

    const queryKeyStatus = [
        "leads/pipeline/status",
        ...Object.values({ is_active: true, pipeline: id }),
    ]

    const { data, active_branch } = useMe()

    const form = useForm<FormValues>({
        defaultValues: {
            branch: active_branch || undefined,
            department: id,
            status: store?.status,
        },
    })
    const pipeline = form.watch("department")

    const { data: dataLeadStatus } = useGet<Pipeline[]>(
        "leads/pipeline/status",
        {
            params: { pipeline },
            enabled: !!pipeline,
        },
    )

    const onSuccess = useCallback(
        (item: Lead) => {
            toast.success("Muvaffaqiyatli qo'shildi")

            const oldData =
                queryClient.getQueryData<Lead[]>(queryKeyUsers) ?? []

            const oldDataStatus =
                queryClient.getQueryData<LeadStatus[]>(queryKeyStatus) ?? []

            const updatedData = oldData?.map((usr) => {
                if (usr.id == item.id) {
                    return {
                        ...usr,
                        status: item.status,
                        updated_at: item.updated_at,
                    }
                } else return usr
            })
            queryClient.setQueryData(queryKeyUsers, updatedData)

            const cfgStatus = oldDataStatus?.map((status) => {
                if (status.id == item.status) {
                    return {
                        ...status,
                        total_count: status.total_count + 1,
                    }
                }
                if (status.id === Number(store?.status)) {
                    console.log("ishladi")

                    return {
                        ...status,
                        total_count: Math.max(0, status.total_count - 1),
                    }
                } else return status
            })

            queryClient.setQueryData(queryKeyStatus, cfgStatus)

            closeModal()
            form.reset()
        },
        [closeModal, form, queryClient],
    )

    const { mutate, isPending } = usePost({ onSuccess })

    const onSubmit = useCallback(
        (values: FormValues) => {
            mutate(
                `leads/exchange`,
                { status: values.status, lead: store?.id },
                {
                    onError: (err) => handleFormError(err, form),
                },
            )
        },
        [mutate, id, form],
    )

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "branch") {
                form.setValue("department", "")
                form.setValue("status", null)
            }
        })
        return () => subscription.unsubscribe()
    }, [form])

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "department") {
                form.setValue("status", null)
            }
        })
        return () => subscription.unsubscribe()
    }, [form])

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-1 px-1"
        >
            <FormCombobox
                control={form.control}
                name="branch"
                options={data?.branches}
                labelKey="name"
                valueKey="id"
                label="Filial tanlang"
                required
            />
            <FormCombobox
                control={form.control}
                name="department"
                options={dataLeadDepartment}
                labelKey="name"
                valueKey="id"
                label="Varonka tanlang"
                required
            />
            {!!pipeline && (
                <FormCombobox
                    control={form.control}
                    name="status"
                    options={dataLeadStatus}
                    labelKey="name"
                    valueKey="id"
                    label="Bo'lim tanlang"
                    required
                />
            )}
            <div className="flex justify-end">
                <Button type="submit" disabled={isPending} loading={isPending}>
                    Saqlash
                </Button>
            </div>
        </form>
    )
}

export default LeadsUpdateDepartment
