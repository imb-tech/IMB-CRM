import { FormDatePicker } from "@/components/form/date-picker"
import { FormNumberInput } from "@/components/form/number-input"
import { FormSelect } from "@/components/form/select"
import FormTextarea from "@/components/form/textarea"
import { Button } from "@/components/ui/button"
import {
    GROUP_STUDENTS_PAYMENT,
    PAYMENT_TYPES_OPTION,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    current: GroupStudentPayments | undefined
}

function PaymentUpdate({ current }: Props) {
    const queryClient = useQueryClient()
    const { data } =
        useGet<{ id: number; name: string }[]>(PAYMENT_TYPES_OPTION)

    const { closeModal } = useModal("payment-update")

    function onSuccess() {
        toast.success("Muvaffaqiyatli yangilandi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({
            queryKey: [GROUP_STUDENTS_PAYMENT],
        })
    }

    const { mutate, isPending } = usePatch({ onSuccess })

    const form = useForm<GroupStudentPayments>({
        defaultValues: {
            amount: Math.abs(Number(current?.amount)),
            payment_type: current?.payment_type,
            date: current?.date,
            description: current?.description,
        },
    })

    const onSubmit = (values: GroupStudentPayments) => {
        const payload = {
            ...values,
            amount: current?.condition
                ? -Math.abs(values.amount)
                : Math.abs(values.amount),
        }

        mutate(`${GROUP_STUDENTS_PAYMENT}/${current?.id}`, payload)
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-1 px-1"
        >
            {current?.condition !== 2 && (
                <FormNumberInput
                    required
                    control={form.control}
                    name={`amount`}
                    label={"Summa"}
                    registerOptions={{
                        min: {
                            value: 0,
                            message: "Qiymat 0 dan kichik bo'lmasligi kerak",
                        },
                    }}
                />
            )}
            <FormSelect
                options={data || []}
                control={form.control}
                name="payment_type"
                labelKey="name"
                valueKey="id"
                label="To'lov turi"
                required
            />

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
                <Button disabled={isPending} loading={isPending}>
                    Saqlash
                </Button>
            </div>
        </form>
    )
}

export default PaymentUpdate
