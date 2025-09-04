import { DataTable } from "@/components/ui/datatable"
import { useGroupSalesCols } from "./cols"
import SectionHeader from "@/components/elements/section-header"
import { useGet } from "@/hooks/useGet"
import { useParams } from "@tanstack/react-router"
import { useMemo } from "react"
import Modal from "@/components/custom/modal"
import { useModal } from "@/hooks/useModal"
import { useForm } from "react-hook-form"
import { FormNumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import FormTextarea from "@/components/form/textarea"
import { usePost } from "@/hooks/usePost"
import DeleteModal from "@/components/custom/delete-modal"
import { handleFormError } from "@/lib/show-form-errors"
import apiGroupStudents from "@/services/hooks/use-group-students"

export default function GroupSale() {
    const columns = useGroupSalesCols()
    const { openModal, closeModal } = useModal("1")
    const { openModal: openDelete } = useModal("delete")

    const { id: group } = useParams({
        from: "/_main/groups/$id/_main/sale",
    })

    const { data, refetch, isLoading } = useGet<ListResp<StudentDiscount>>(
        "platform/group-students/discounts",
        { params: { group } },
    )

    const { data: students } = apiGroupStudents(group)

    const mergedData = useMemo<StudentMergeDiscount[]>(() => {
        if (!students?.length) {
            return []
        }
        return students.map((st) => {
            const std = data?.results.find((t) => t.group_student == st.id)
            return {
                ...st,
                ...std,
                group_student: st.id,
            }
        })
    }, [students, data])

    const { mutate, isPending } = usePost({
        onSuccess() {
            refetch()
            closeModal()
            form.reset({})
        },
        onError: (err) => handleFormError(err, form),
    })

    const form = useForm<StudentDiscount>()

    function handleSubmit(v: StudentMergeDiscount) {
        mutate("platform/group-students/discounts", {
            amount: v.amount,
            group_student: v.group_student,
            count: v.count,
            reason: v.reason,
        })
    }

    return (
        <div className="pt-1">
            <SectionHeader title="O'quvchilarga chegirma berish" />
            <DataTable
                columns={columns}
                data={mergedData}
                viewAll
                loading={isLoading}
                numeration
                onEdit={({ original }) => {
                    form.setValue("amount", Number(original.amount))
                    form.setValue("count", original.count ? Number(original.count) : undefined)
                    form.setValue("reason", original.reason ?? "")
                    form.setValue(
                        "group_student",
                        Number(original.group_student),
                    )
                    openModal()
                }}
                onDelete={({ original }) => {
                    openDelete()
                    form.setValue("id", Number(original.id))
                }}
            />

            <DeleteModal
                id={form.watch("id")}
                path="platform/group-students/discounts"
            />

            <Modal modalKey="1" title="O'quvchi uchun chegirma">
                <form
                    className="flex flex-col gap-3 py-2"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
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
            </Modal>
        </div>
    )
}
