import FormImagePicker from "@/components/form/image-picker"
import FormInput from "@/components/form/input"
import { FormMultiCombobox } from "@/components/form/multi-combobox"
import PhoneField from "@/components/form/phone-field"
import { FormSelect } from "@/components/form/select"
import { Button } from "@/components/ui/button"
import { EMPLOYEE, OPTION_ROLES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import useMe from "@/hooks/useMe"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { generateUsername } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    item: Employee | null
}

const EmployeeCreate = ({ item }: Props) => {
    const queryClient = useQueryClient()
    const { closeModal, isOpen } = useModal(`${EMPLOYEE}-add`)

    const { data: roles } = useGet<RoleOption[]>(OPTION_ROLES, {
        options: { enabled: isOpen },
    })
    const { data, active_branch } = useMe()

    const form = useForm<Employee>({
        defaultValues:
            item?.id ?
                {
                    ...item,
                    branches_field: item.branches.map((f) => f.id),
                }
            :   {
                    branches_field: active_branch ? [active_branch] : [],
                },
    })

    function onSuccess() {
        toast.success("Muvaffaqiyatli yangilandi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: [EMPLOYEE] })
    }
    const headers = {
        "Content-Type": "multipart/form-data",
    }

    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost(
        {
            onSuccess,
        },
        { headers },
    )
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch(
        {
            onSuccess,
        },
        { headers },
    )
    const disabled = isPendingCreate || isPendingUpdate

    const onSubmit = (values: Employee) => {
        const formFields = {
            ...values,
            branches: values.branches_field?.join(","),
            photo:
                !values.photo || typeof values.phone == "string" ?
                    undefined
                :   values.phone,
        }
        if (item?.id) {
            mutateUpdate(`${EMPLOYEE}/${item.id}`, formFields)
        } else {
            mutateCreate(EMPLOYEE, formFields)
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
        >
            <div className="md:col-span-2">
                <FormImagePicker
                    methods={form}
                    name="photo"
                    label="Rasm"
                    avatar
                />
            </div>
            <FormInput
                required
                methods={form}
                name="full_name"
                placeholder="FIO"
                autoComplete="off"
                label="FIO"
                onChange={(v) => {
                    const value = v.target.value
                    form.setValue("full_name", value)
                    if (!item?.username) {
                        form.setValue("username", generateUsername(value))
                    }
                }}
            />
            <PhoneField
                required
                methods={form}
                name="phone"
                label="Telefon raqam"
            />

            <FormMultiCombobox
                required
                control={form.control}
                options={data?.branches ?? []}
                labelKey="name"
                valueKey="id"
                label="Filial nomi"
                name="branches_field"
            />
            <FormSelect
                control={form.control}
                name="role"
                options={roles ?? []}
                valueKey="id"
                label="Lavozim"
                labelKey="name"
                required
            />

            <div className="grid grid-cols-2 items-start gap-1">
                <FormInput
                    required
                    methods={form}
                    name="username"
                    placeholder="Login"
                    label="Login"
                />

                <FormInput
                    type="password"
                    required={!item?.id}
                    methods={form}
                    name="password"
                    placeholder="Parol"
                    label="Parol"
                    minLength={4}
                />
            </div>

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
