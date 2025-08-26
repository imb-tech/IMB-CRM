import { useModal } from "@/hooks/useModal"
import { Path, useForm } from "react-hook-form"
import { FormNumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import FormTextarea from "@/components/form/textarea"
import { usePost } from "@/hooks/usePost"
import { AxiosError } from "axios"
import { FormCombobox } from "@/components/form/combobox"
import {
    GROUP_STUDENTS_DISCOUNTS,
    OPTION_GROUPS_STUDENTS,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import useMe from "@/hooks/useMe"
import { useCallback, useMemo, useState } from "react"
import { useParams } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"

export default function DiscountStudentCreate({
    current,
}: {
    current: DiscountStudent | null
}) {
    const queryClient = useQueryClient()

    const { id } = useParams({ strict: false }) as { id: string }
    const { active_branch } = useMe()

    const [search, setSearch] = useState<string>("")
    const { closeModal } = useModal("discount-add")
    const { data: groupOptions = [] } = useGet<Group[]>(
        OPTION_GROUPS_STUDENTS,
        {
            params: { search, branch: active_branch, student: id },
        },
    )

    const { mutate, isPending } = usePost({
        onSuccess() {
            closeModal()
            form.reset({})
            queryClient.invalidateQueries({
                queryKey: [GROUP_STUDENTS_DISCOUNTS],
            })
        },
        onError(errors: AxiosError) {
            for (const [k, v] of Object.entries(errors.response?.data ?? {})) {
                form.setError(k as Path<DiscountStudent>, {
                    type: "validate",
                    message: v,
                })
            }
        },
    })

    const form = useForm<DiscountStudent>({
        defaultValues: {
            group_student: current?.group_student,
            amount: current?.amount,
            count: current?.count,
            reason: current?.reason,
        },
    })

    const handleSubmit = useCallback(
        (v: DiscountStudent) => {
            mutate(GROUP_STUDENTS_DISCOUNTS, {
                amount: v.amount,
                group_student: v.group_student,
                count: v.count,
                reason: v.reason,
            })
        },
        [current, mutate],
    )

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

    return (
        <form
            className="flex flex-col gap-3 py-2"
            onSubmit={form.handleSubmit(handleSubmit)}
        >
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
            <FormNumberInput
                control={form.control}
                name="amount"
                label="Chegirmadagi krus narxi"
                placeholder="Misol: 799 000"
                required
            />

            <FormNumberInput
                control={form.control}
                name="count"
                label="Chegirmalar soni"
                placeholder="Amal qilish soni"
                required
            />

            <FormTextarea
                methods={form}
                name="reason"
                label="Izoh"
                placeholder="Izoh yoki chegirma sababini kiritishingiz mumkin"
                required
            />

            <Button loading={isPending}>Saqlash</Button>
        </form>
    )
}
