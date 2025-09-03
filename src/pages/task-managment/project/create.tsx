import FormImagePicker from "@/components/form/img-picker"
import FormInput from "@/components/form/input"
import { FormMultiCombobox } from "@/components/form/multi-combobox"
import { Button } from "@/components/ui/button"
import { OPTION_EMPLOYEES, TASKLY_PROJECT } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import { cn, getRandomImage, imagePaths } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { Image } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    item?: FormValues | undefined
}

function ProjectCreate({ item }: Props) {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("project-create")
    const form = useForm<FormValues>()
    const [search, setSearch] = useState("")

    const { data: hrData, isLoading } = useGet<OptionEmployees[]>(
        OPTION_EMPLOYEES,
        {
            params: { search, page_size: 5 },
        },
    )

    const { mutate: mutateCreate, isPending: isPendingCreate } = usePost(
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [TASKLY_PROJECT] })
                toast.success("Muvaffaqiyatli qo'shildi")
                closeModal()
                form.reset()
            },
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = usePatch(
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [TASKLY_PROJECT] })
                if (item?.id) {
                    queryClient.invalidateQueries({
                        queryKey: [`${TASKLY_PROJECT}/${item?.id}`],
                    })
                    queryClient.invalidateQueries({
                        queryKey: [OPTION_EMPLOYEES],
                    })
                }
                toast.success("Muvaffaqiyatli yangilandi")
                closeModal()
                form.reset()
            },
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )

    const onSubmit = async (values: FormValues) => {
        const formData = new FormData()
        formData.append("name", values.name)
        if (values?.employees?.length) {
            formData.append("employees", `[${values.employees.join(",")}]`)
        }

        let backgroundValue = values.background

        if (!backgroundValue) {
            backgroundValue = getRandomImage()
        }

        const isUpdate = Boolean(item?.id)

        if (isUpdate) {
            const prevBackground = item?.background
            if (backgroundValue !== prevBackground) {
                if (typeof backgroundValue === "string") {
                    const file = await urlToFile(
                        backgroundValue,
                        "background.jpg",
                    )
                    formData.append("background", file)
                } else {
                    formData.append("background", backgroundValue)
                }
            }
            mutateUpdate(`${TASKLY_PROJECT}/${item?.id}`, formData)
        } else {
            if (typeof backgroundValue === "string") {
                const file = await urlToFile(backgroundValue, "background.jpg")
                formData.append("background", file)
            } else {
                formData.append("background", backgroundValue)
            }
            mutateCreate(TASKLY_PROJECT, formData)
        }
    }

    useEffect(() => {
        if (item?.id) {
            form.reset({
                name: item.name,
                background: item.background,
                employees: item?.invited_users?.map((user) => user.empl_id),
            })
        }
    }, [form, item])

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
                methods={form}
                name="name"
                label={"Loyiha nomi"}
                required
            />
            <div className="py-1">
                <FormMultiCombobox
                    label={"Xodim biriktirish"}
                    placeholder={"Keyinga qoldirishingiz ham mumkin"}
                    control={form.control}
                    name="employees"
                    labelKey="full_name"
                    onSearchChange={setSearch}
                    valueKey="id"
                    options={hrData}
                    isLoading={isLoading}
                />
            </div>

            <div className="w-full overflow-x-auto no-scrollbar-x">
                <div className="flex gap-2 w-max">
                    {imagePaths.map((item, index) => (
                        <div
                            onClick={() => form.setValue("background", item)}
                            className={cn(
                                "w-20 h-20 border rounded shrink-0 cursor-pointer hover:shadow-lg",
                                form.watch("background") === item &&
                                    "border-primary",
                            )}
                            key={index}
                        >
                            <img
                                src={item}
                                className="w-full h-full object-cover rounded"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <FormImagePicker
                methods={form}
                name="background"
                label={
                    <div className="flex items-center gap-2 justify-center">
                        <Image size={20} /> <span>{"Orqa fon rasmi"}</span>
                    </div>
                }
            />

            <Button
                disabled={isPendingCreate || isPendingUpdate}
                loading={isPendingCreate || isPendingUpdate}
                className="float-end sm:w-max w-full"
            >
                {"Saqlash"}
            </Button>
        </form>
    )
}

export default ProjectCreate

export async function urlToFile(url: string, fileName: string): Promise<File> {
    const res = await fetch(url)
    const blob = await res.blob()
    const contentType = blob.type || "image/jpeg"
    return new File([blob], fileName, { type: contentType })
}
