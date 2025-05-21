import { FormCombobox } from "@/components/form/combobox"
import { FormFormatNumberInput } from "@/components/form/format-number-input"
import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { COUNTRY, USERS } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useTypedStoreData } from "@/hooks/useStoreData"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Form = {
    full_name: string
    phone_number: number | string
    address: string
    region: number
    password: string | number
    username: string | number
}

const CustomerCreate = () => {
    const { closeModal } = useModal("customer-modal")
    const { openModal: openModalAdd } = useModal("countries-modal")
    const { storeData } = useTypedStoreData<CustomersType>()

    const { data, isLoading } = useGet<CountriesResults>(COUNTRY, {
        params: { page_size: 50 },
    })

    const form = useForm<Form>({
        defaultValues: storeData ?? {},
    })

    const queryClient = useQueryClient()
    const { mutate: cretaeMutate, isPending: isPendingCreate } = usePost({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli qo'shildi")
            closeModal()
            queryClient.invalidateQueries({ queryKey: [USERS] })
            form.reset()
        },
    })
    const { mutate: updateMutate, isPending: isPendingUpdate } = usePatch({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yangilandi")
            closeModal()
            queryClient.invalidateQueries({ queryKey: [USERS] })
            form.reset()
        },
    })

    const onSubmit = (data: Form) => {
        if (storeData?.id) {
            updateMutate(`${USERS}/${storeData?.id}`, data)
        } else {
            cretaeMutate(USERS, data)
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-3 grid md:grid-cols-2 grid-cols-1"
        >
            <FormInput
                required
                methods={form}
                name="full_name"
                label="F.I.O"
                wrapperClassName={"md:col-span-2"}
            />
            <FormFormatNumberInput
                required
                control={form.control}
                name="phone_number"
                wrapperClassName="md:col-span-2"
                format="+998 ## ### ## ##"
            />
            <FormCombobox
                options={data?.results}
                isLoading={isLoading}
                labelKey="name"
                valueKey="id"
                control={form.control}
                name="region"
                label="Mintaqa/Shahar"
                required
                onAdd={openModalAdd}
            />
            <FormInput
                required
                methods={form}
                name="address"
                label="Manzil"
                placeholder="Manzil"
            />
            <FormInput
                required
                methods={form}
                name="username"
                label="Login"
                placeholder="username11"
            />
            <FormInput
                required
                methods={form}
                type="password"
                name="password"
                label="Parol"
                placeholder="******"
            />
            <div className="flex justify-end md:col-span-2">
                <Button
                    disabled={isPendingCreate || isPendingUpdate}
                    loading={isPendingCreate || isPendingUpdate}
                    type="submit"
                >
                    Saqlash
                </Button>
            </div>
        </form>
    )
}

export default CustomerCreate
