import { FormDatePicker } from "@/components/form/date-picker"
import FormImagePicker from "@/components/form/image-picker"
import FormInput from "@/components/form/input"
import { FormMultiCombobox } from "@/components/form/multi-combobox"
import PhoneField from "@/components/form/phone-field"
import { FormSelect } from "@/components/form/select"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { OPTION_GROUPS, STUDENT } from "@/constants/api-endpoints"
import useMe from "@/hooks/useMe"
import { useModal } from "@/hooks/useModal"
import { usePatch } from "@/hooks/usePatch"
import { usePost } from "@/hooks/usePost"
import showFormErrors from "@/lib/show-form-errors"
import { generateUsername } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { FormCombobox } from "@/components/form/combobox"
import { useEffect, useState } from "react"
import { useGet } from "@/hooks/useGet"

type Props = {
    item: Student | null
}

const StudentCreate = ({ item }: Props) => {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(`${STUDENT}-add`)
    const [search, setSearch] = useState<string>("")
    const [resId, setResId] = useState<string>("")
    const { data, active_branch } = useMe()
    const [openedAccordion, setOpenedAccordion] = useState<string | null>(null)

    const { data: dataGroups } = useGet<Group[]>(OPTION_GROUPS, {
        params: { search, branch: active_branch },
    })

    const form = useForm<Student>({
        defaultValues: item
            ? {
                  full_name: item.full_name,
                  phone: item.phone,
                  username: item.username,
                  branches: item?.branches_data?.map((b) => b.id),
              }
            : {
                  branches: [active_branch!],
              },
    })
    const photo = form.watch("photo")
    const isFile = photo && typeof photo !== "string"

    const headers = { "Content-Type": "multipart/form-data" }

    function onSuccess() {
        toast.success("Muvaffaqiyatli yangilandi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: [STUDENT] })
    }

    const { mutate, isPending, isSuccess } = usePost({
        onSuccess: (data) => (isFile ? setResId(data.id) : onSuccess()),
    })

    const { mutate: mutateImage, isPending: isPendingImage } = usePost(
        { onSettled: onSuccess },
        { headers },
    )

    const { mutate: patch, isPending: isPatching } = usePatch(
        { onSuccess },
        { headers },
    )

    const disabled = isPending || isPatching || isPendingImage

    const onSubmit = (values: Student) => {
        const body = {
            ...values,
            branches: values.branches.join(","),
            photo: undefined,
        }
        const file = isFile ? photo : undefined

        if (item?.id) {
            patch(
                `${STUDENT}/${item.id}`,
                { ...body, photo: file },
                { onError: (err) => showFormErrors(err, form) },
            )
        } else {
            mutate(STUDENT, body, {
                onError: (err) => showFormErrors(err, form),
            })
        }
    }

    useEffect(() => {
        if (openedAccordion === "1") {
            const current = form.getValues("group_data") || {}
            form.setValue("group_data", {
                start_date: current.start_date || String(new Date()),
                status: current.status ?? 1,
                group: current.group || null,
            })
        }
    }, [openedAccordion])

    useEffect(() => {
        if (isSuccess && photo) {
            const formData = new FormData()
            formData.append("photo", photo)
            formData.append("user", resId)
            mutateImage("students/change-photo", formData)
        }
    }, [isPending])

     console.log(form.formState.errors);
     


    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-5 px-1"
        >
            <div className="md:col-span-2">
                <FormImagePicker
                    methods={form}
                    name="photo"
                    avatar
                    label="Rasm"
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

            {!item?.id && (
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    onValueChange={(value) => setOpenedAccordion(value)}
                >
                    <AccordionItem value={"1"}>
                        <AccordionTrigger className="px-3">
                            Guruhga qo'shish
                        </AccordionTrigger>
                        <AccordionContent className="flex pl-3 mt-2 flex-col px-1 gap-3 text-balance ">
                            <FormCombobox
                                control={form.control}
                                name="group_data.group"
                                options={dataGroups?.map((item) => ({
                                    name: `${item.name} - ${item.teacher_name}`,
                                    id: item.id,
                                }))}
                                labelKey="name"
                                onSearchChange={(v) => setSearch(v)}
                                valueKey="id"
                                label="Guruh tanlang"
                                required={openedAccordion === "1"}
                            />
                            <FormSelect
                                options={[
                                    {
                                        name: "Aktiv",
                                        id: 1,
                                    },
                                    {
                                        name: "Yangi",
                                        id: 0,
                                    },
                                ]}
                                control={form.control}
                                name="group_data.status"
                                labelKey="name"
                                valueKey="id"
                                label="Holati"
                                required={openedAccordion === "1"}
                            />

                            <FormDatePicker
                                control={form.control}
                                name="group_data.start_date"
                                label="Qo'shilish sanasi"
                                className="!w-full"
                                required={openedAccordion === "1"}
                                fullWidth
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value={"2"}>
                        <AccordionTrigger className="px-3">
                            Ota-ona telefon raqamini qo'shish
                        </AccordionTrigger>
                        <AccordionContent className="flex px-1 mt-2 pl-3 flex-col gap-3 text-balance ">
                            <FormInput
                                required={openedAccordion === "2"}
                                methods={form}
                                name="parents.full_name"
                                placeholder="O'quvchining to'liq ismi"
                                autoComplete="off"
                                label="FIO"
                                onChange={(v) => {
                                    const value = v.target.value
                                    form.setValue("parents.full_name", value)
                                    if (!item?.username) {
                                        form.setValue(
                                            "parents.username",
                                            generateUsername(value),
                                        )
                                    }
                                }}
                            />
                            <PhoneField
                                required={openedAccordion === "2"}
                                methods={form}
                                name="parents.phone"
                                label="Telefon raqam"
                                onChange={(v) => {
                                    form.setValue("parents.phone", v)
                                    if (!item?.username) {
                                        form.setValue(
                                            "parents.password",
                                            v?.replace("+998", ""),
                                        )
                                    }
                                }}
                            />
                            <div className="grid grid-cols-2 items-start gap-3">
                                <FormInput
                                    required={openedAccordion === "2"}
                                    methods={form}
                                    name="parents.username"
                                    placeholder="Login"
                                    label="Login"
                                />

                                <FormInput
                                    methods={form}
                                    name="parents.password"
                                    placeholder="Parol"
                                    label="Parol"
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}

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
