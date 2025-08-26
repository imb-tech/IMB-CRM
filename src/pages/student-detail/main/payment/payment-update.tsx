import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import { FormNumberInput } from "@/components/form/number-input"
import { FormSelect } from "@/components/form/select"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import {
    GROUP_STUDENTS_PAYMENT,
    OPTION_GROUPS_STUDENTS,
    PAYMENT_TYPES_OPTION,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import useMe from "@/hooks/useMe"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { useState, useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    current: GroupStudentPayments | null
}

function PaymentUpdate({ current }: Props) {
    const queryClient = useQueryClient()
    const { id } = useParams({ strict: false }) as { id: string }
    const { active_branch } = useMe()
    const { closeModal } = useModal("payment-update")

    const [search, setSearch] = useState<string>("")

    const { data: paymentTypes = [] } =
        useGet<{ id: number; name: string }[]>(PAYMENT_TYPES_OPTION)

    const { data: groupOptions = [] } = useGet<Group[]>(
        OPTION_GROUPS_STUDENTS,
        {
            params: { search, branch: active_branch, student: id },
        },
    )

    const form = useForm<GroupStudentPayments>({
        defaultValues: {
            amount: Math.abs(Number(current?.amount)),
            payment_type: current?.payment_type,
            date: current?.date,
            description: current?.description,
            group_student: current?.group_data.id,
        },
    })

    const onSuccess = useCallback(() => {
        toast.success("Muvaffaqiyatli yangilandi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({
            queryKey: [GROUP_STUDENTS_PAYMENT],
        })
    }, [closeModal, form, queryClient])

    const { mutate: mutatePatch, isPending: isPendingPatch } = usePatch({
        onSuccess,
    })

    const { mutate: mutatePost, isPending: isPendingPost } = usePost({
        onSuccess,
    })

    const isSubmitting = isPendingPost || isPendingPatch

    const groupSelectOptions = useMemo(
        () =>
            groupOptions.map((item) => ({
                id: item.id,
                name: `${item.name} - ${item.teacher_name} - ${
                    item.is_active ? "Aktiv" : "O'chirilgan"
                }`,
            })),
        [groupOptions],
    )

    const onSubmit = useCallback(
        (values: GroupStudentPayments) => {
            const payload = {
                ...values,
                amount: current?.condition
                    ? -Math.abs(values.amount)
                    : Math.abs(values.amount),
            }

            if (current?.id) {
                mutatePatch(`${GROUP_STUDENTS_PAYMENT}/${current.id}`, payload)
            } else {
                mutatePost(GROUP_STUDENTS_PAYMENT, {
                    ...payload,
                    condition: 1,
                })
            }
        },
        [current, mutatePatch, mutatePost],
    )

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-1 px-1"
        >
            {!current?.id && (
                <FormCombobox
                    control={form.control}
                    name="group_student"
                    options={groupSelectOptions}
                    labelKey="name"
                    onSearchChange={setSearch}
                    valueKey="id"
                    label="Guruh tanlang"
                    required
                />
            )}
            <FormNumberInput
                required
                control={form.control}
                name="amount"
                label="Summa"
                registerOptions={{
                    min: {
                        value: 0,
                        message: "Qiymat 0 dan kichik bo'lmasligi kerak",
                    },
                }}
            />

            {!current?.id && (
                <FormSelect
                    options={paymentTypes}
                    control={form.control}
                    name="payment_type"
                    labelKey="name"
                    valueKey="id"
                    label="To'lov turi"
                    required
                />
            )}

            <FormDatePicker
                control={form.control}
                name="date"
                label="To'lov sanasi"
                className="!w-full"
                required
                fullWidth
            />

            <FormTextarea
                methods={form}
                name="description"
                label="Izoh"
                className="!w-full"
            />

            <div className="flex justify-end">
                <Button disabled={isSubmitting} loading={isSubmitting}>
                    Saqlash
                </Button>
            </div>
        </form>
    )
}

export default PaymentUpdate
