import FormImagePicker from "@/components/form/image-picker"
import FormInput from "@/components/form/input"
import { FormMultiCombobox } from "@/components/form/multi-combobox"
import PhoneField from "@/components/form/phone-field"
import { Button } from "@/components/ui/button"
import { STUDENT } from "@/constants/api-endpoints"
import useMe from "@/hooks/useMe"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { generateUsername } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    item: Student | null
}

const StudentCreate = ({ item }: Props) => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${STUDENT}-add`)
    const { data, active_branch } = useMe()

    const form = useForm<Student>({
        defaultValues:
            item ?
                {
                    ...item,
                    branches: item?.branches_data?.map((b) => b.id),
                    branches_data: undefined,
                }
            :   { branches: [active_branch!] },
    })

    const headers = { "Content-Type": "multipart/form-data" }

    function onSuccess() {
        toast.success("Muvaffaqiyatli yangilandi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: [STUDENT] })
    }

    const { mutate, isPending } = usePost({ onSuccess }, { headers })
    const { mutate: patch, isPending: isPatching } = usePatch(
        { onSuccess },
        { headers },
    )

    const disabled = isPending || isPatching

    const onSubmit = (values: Student) => {
        const v = {
            ...values,
            branches: values.branches.join(","),
            photo:
                !values.photo || typeof values.photo == "string" ?
                    undefined
                :   values.photo,
        }
        if (item?.id) {
            patch(`${STUDENT}/${item?.id}`, v)
        } else {
            mutate(STUDENT, v)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="md:col-span-2">
                <FormImagePicker
                    methods={form}
                    name="photo"
                    avatar
                />
            </div>
            <FormInput
                required
                methods={form}
                name="full_name"
                placeholder="O'quvchining to'liq ismi"
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
                onChange={(v) => {
                    form.setValue("phone", v)
                    if (!item?.username) {
                        form.setValue("password", v?.replace("+998", ""))
                    }
                }}
            />

            <FormMultiCombobox
                required
                control={form.control}
                options={data?.branches ?? []}
                labelKey="name"
                valueKey="id"
                label="Filial nomi"
                name="branches"
            />

            <div className="grid grid-cols-2 items-start gap-3">
                <FormInput
                    required
                    methods={form}
                    name="username"
                    placeholder="Login"
                    label="Login"
                />

                <FormInput
                    methods={form}
                    name="password"
                    placeholder="Parol"
                    label="Parol"
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

export default StudentCreate
