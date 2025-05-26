import { FormDatePicker } from "@/components/form/date-picker"
import FormImagePicker from "@/components/form/image-picker"
import FormInput from "@/components/form/input"
import { FormNumberInput } from "@/components/form/number-input"
import PhoneField from "@/components/form/phone-field"
import { Button } from "@/components/ui/button"
import { EMPLOYEE } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    item: Employee | null
}

const EmployeeCreate = ({ item }: Props) => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${EMPLOYEE}-add`)
    const form = useForm<Employee>({ defaultValues: item || undefined })
    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yaratildi")
            closeModal()
            form.reset()
            queryClient.invalidateQueries({queryKey:[EMPLOYEE]})
        },
    })
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch({
        onSuccess: () => {
            toast.success("Muvaffaqiyatli yangilandi")
            closeModal()
            form.reset()
            queryClient.invalidateQueries({queryKey:[EMPLOYEE]})
        },
    })
    const disabled = isPendingCreate || isPendingUpdate

    const onSubmit = (values: Employee) => {
        console.log(values)
        if (item?.id) {
            mutateUpdate(`${EMPLOYEE}/${item.id}`, values)
        } else {
            mutateCreate(EMPLOYEE, values)
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-4"
        >
            <div className="md:col-span-2">
                <FormImagePicker
                    methods={form}
                    name="img_name"
                    label="Rasm"
                    avatar
                />
            </div>
            <FormInput
                required
                methods={form}
                name="full_name"
                placeholder="FIO"
                label="FIO"
            />
            <PhoneField
                required
                methods={form}
                name="phone"
                label="Telefon raqam"
            />
            <FormDatePicker
                required
                control={form.control}
                name="birth_date"
                label="Tug'ilgan sana"
            />
            <FormDatePicker
                required
                control={form.control}
                name="hired_date"
                label="Ishga olingan sana"
            />
            <FormNumberInput
                required
                control={form.control}
                name="percent"
                label="Foiz ulush"
            />
            <FormNumberInput
                required
                control={form.control}
                name="salary"
                label="Oylik ish haqi"
            />
            <FormInput
                type="password"
                required
                methods={form}
                name="password"
                placeholder="Parol"
                label="Parol"
            />
            <div className="md:col-span-2 flex  justify-end">
                <Button
                    className="md:w-max w-full"
                    type="submit"
                    disabled={disabled}
                    loading={disabled}
                >
                    Saqlash
                </Button>
            </div>
        </form>
    )
}

export default EmployeeCreate
