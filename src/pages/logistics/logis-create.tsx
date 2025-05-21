import FormInput from "@/components/form/input"
import PhoneField from "@/components/form/phone-field"
import { Button } from "@/components/ui/button"
import { USERS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useTypedStoreData } from "@/hooks/useStoreData"
import { cleanData } from "@/lib/format-data"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Form = {
    full_name: string
    phone_number: number | string
    password: string | number
    username: string | number
}

const LogisticsCreate = () => {
    const { closeModal } = useModal("logis-modal")
    const { storeData } = useTypedStoreData<LogisticsType>()
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
        const formtaData = cleanData(data)
        if (storeData?.id) {
            updateMutate(`${USERS}/${storeData?.id}`, formtaData)
        } else {
            cretaeMutate(USERS, formtaData)
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
            <PhoneField
                required
                methods={form}
                name="phone_number"
                wrapperClassName="md:col-span-2"
            />
            <FormInput
                required
                methods={form}
                name="username"
                label="Login"
                placeholder="username11"
            />
            <FormInput
                required={storeData?.id ? false : true}
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

export default LogisticsCreate
