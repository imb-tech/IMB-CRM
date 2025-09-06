import { FormCombobox } from "@/components/form/combobox"
import { FormDatePicker } from "@/components/form/date-picker"
import { FormNumberInput } from "@/components/form/number-input"
import FormTextarea from "@/components/form/textarea"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import { FINANCE_ADVANCE, OPTION_EMPLOYEES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { Button } from "@/components/ui/button"

export default function AdvanceCreateForm() {
    const { store: dataItem } = useStore<Advance>("advance-data")
    const form = useForm<Advance>({
        defaultValues: {
            amount: "",
            date: String(new Date()),
            body: "",
        },
    })
    const { control, reset, handleSubmit } = form
    const queryClient = useQueryClient()
    const { closeModal } = useModal("advances-modal")
    const [searchCustomer, setCustomerSearch] = useState("")

    const { data: dataCustomer, isLoading: isLoadingCustomer } = useGet<
        OptionEmployees[]
    >(OPTION_EMPLOYEES, {
        params: { search: searchCustomer },
    })

    const onSuccess = () => {
        queryClient.invalidateQueries({ queryKey: [FINANCE_ADVANCE] })
        toast.success(
            `Muvaffaqiyatli ${dataItem?.id ? "yangilandi" : "qo'shildi"}`,
        )
        closeModal()
        reset()
    }

    const { mutate: postMutate, isPending: isPendingCreate } = usePost({
        onSuccess,
    })

    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess,
    })

    const onSubmit = (values: Advance) => {
        if (dataItem?.id) {
            updateMutate(`${FINANCE_ADVANCE}/${dataItem.id}`, values)
        } else {
            postMutate(FINANCE_ADVANCE, values)
        }
    }

    useEffect(() => {
        if (dataItem) {
            reset(dataItem)
        }
    }, [dataItem, form])

    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormCombobox
                    control={control}
                    required
                    labelKey="full_name"
                    valueKey="id"
                    name="advance_owner"
                    options={dataCustomer || []}
                    label={"Xodim"}
                    onSearchChange={(val) => setCustomerSearch(val)}
                    isLoading={isLoadingCustomer}
                />
                <FormNumberInput
                    required
                    control={control}
                    label={"Summa"}
                    name="amount"
                    placeholder="Ex: 123 000"
                    size={"lg" as any}
                    thousandSeparator=" "
                />
                <FormDatePicker
                    required
                    addButtonProps={{
                        className: "md:w-full justify-start",
                    }}
                    label={"Sana"}
                    control={control}
                    name="date"
                />
                <FormTextarea
                    required
                    label={"Izoh"}
                    methods={form}
                    name="body"
                />

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isPendingCreate || isPendingUpdate}
                        loading={isPendingCreate || isPendingUpdate}
                    >
                        Saqlash
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}
