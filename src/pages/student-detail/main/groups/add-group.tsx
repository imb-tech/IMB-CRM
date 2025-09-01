import { toast } from "sonner"
import { usePost } from "@/hooks/usePost"
import { FormNumberInput } from "@/components/form/number-input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import FormTextarea from "@/components/form/textarea"
import { format } from "date-fns"
import { Path, useForm } from "react-hook-form"
import { FormCombobox } from "@/components/form/combobox"
import { FormSelect } from "@/components/form/select"
import { FormDatePicker } from "@/components/form/date-picker"
import { useQueryClient } from "@tanstack/react-query"
import { useModal } from "@/hooks/useModal"
import { useCallback, useMemo, useState } from "react"
import useMe from "@/hooks/useMe"
import {
    GROUP,
    GROUP_STUDENTS,
    OPTION_GROUPS,
    STUDENT_GROUP,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AxiosError } from "axios"
import { useSearch } from "@tanstack/react-router"
import { useParams } from "@tanstack/react-router"

type Props = {
    id: string
    leads?: boolean
    url?: string
}

function AddGroup({ id, leads = false, url = GROUP_STUDENTS }: Props) {
    const params = useSearch({ strict: false })
    const { id: statusId } = useParams({ strict: false })
    const queryClient = useQueryClient()
    const { closeModal } = useModal("student-groups-add")
    const [search, setSearch] = useState("")
    const { active_branch } = useMe()
    const [openedAccordion, setOpenedAccordion] = useState<string | null>(null)

    const { data: groupsOptions } = useGet<Group[]>(OPTION_GROUPS, {
        params: { search, branch: active_branch },
    })

    const queryKeyUsers = [
        "leads/crud",
        ...Object.values({ ...params, pipeline: statusId }),
    ]

    const queryKeyStatus = [
        "leads/pipeline/status",
        ...Object.values({ is_active: true, pipeline: statusId }),
    ]

    const form = useForm<GroupStudentCreate>({
        defaultValues: {
            status: leads ? 0 : 1,
            start_date: format(new Date(), "yyyy-MM-dd"),
        },
    })

    const onSuccess = useCallback(() => {
        if (leads) {
            const originUsers =
                queryClient.getQueryData<LeadFields[]>(queryKeyUsers)

            queryClient.setQueryData(
                queryKeyUsers,
                originUsers?.filter((usr) => usr.id !== Number(id)),
            )
        }

        toast.success("Muvaffaqiyatli qo'shildi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: [STUDENT_GROUP] })
        queryClient.invalidateQueries({ queryKey: [GROUP] })

        if (leads) {
            queryClient.refetchQueries({ queryKey: queryKeyStatus })
        }
    }, [closeModal, form, queryClient])

    const { mutate, isPending } = usePost({ onSuccess })

    const onError = useCallback(
        (errors: AxiosError) => {
            const data = errors.response?.data ?? {}
            for (const [key, value] of Object.entries(data)) {
                if (key === "group_students" && Array.isArray(value)) {
                    value.forEach((groupError, index) => {
                        if (
                            typeof groupError === "object" &&
                            groupError !== null
                        ) {
                            for (const [field, messages] of Object.entries(
                                groupError,
                            )) {
                                console.log(field)
                                console.log(messages)

                                form.setError(
                                    field as Path<GroupStudentCreate>,
                                    {
                                        type: "validate",
                                        message: String(messages),
                                    },
                                )
                            }
                        }
                    })
                } else {
                    toast.error(
                        (errors as any).response?.msg ||
                            "Xatolik yuzaga keldi qaytadan urinib ko'ring!",
                    )
                }
            }
        },
        [form],
    )

    const onSubmit = useCallback(
        (values: GroupStudentCreate) => {
            const { discount, ...rest } = values
            const body = {
                ...rest,
                is_group: true,
                ...(leads ? { lead: Number(id) } : { student: id }),
                ...(discount?.amount && discount?.reason ? { discount } : {}),
            }

            mutate(url, leads ? body : { group_students: [body] }, {
                onError,
            })
        },
        [mutate, id, form],
    )

    const groupSelectOptions = useMemo(
        () =>
            groupsOptions?.map((item) => ({
                name: `${item.name} - ${item.teacher_name} - ${
                    item.is_active ? "Aktiv" : "O'chirilgan"
                }`,
                id: item.id,
            })) || [],
        [groupsOptions],
    )

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-1 px-1"
        >
            <FormCombobox
                control={form.control}
                name="group"
                options={groupSelectOptions}
                labelKey="name"
                onSearchChange={setSearch}
                valueKey="id"
                label="Guruh tanlang"
                required
            />
            <div
                className={cn(
                    "grid grid-cols-2 items-start gap-3",
                    leads && "grid-cols-1",
                )}
            >
                {!leads && (
                    <FormSelect
                        control={form.control}
                        name="status"
                        label="Holati"
                        labelKey="name"
                        valueKey="id"
                        options={[
                            { name: "Aktiv", id: 1 },
                            { name: "Yangi", id: 0 },
                        ]}
                        required
                    />
                )}
                <FormDatePicker
                    control={form.control}
                    name="start_date"
                    label="Qo'shilish sanasi"
                    className="!w-full"
                    fullWidth
                    required
                />
            </div>

            <Accordion
                type="single"
                collapsible
                onValueChange={setOpenedAccordion}
            >
                <AccordionItem value="1">
                    <AccordionTrigger className="px-3">
                        Chegirma berish
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3 mt-2 pl-3 px-1">
                        <FormNumberInput
                            required={openedAccordion === "1"}
                            control={form.control}
                            name="discount.amount"
                            label="Chegirma narxi"
                            registerOptions={{
                                min: {
                                    value: 0,
                                    message:
                                        "Qiymat 0 dan kichik bo'lmasligi kerak",
                                },
                            }}
                        />
                        <FormTextarea
                            required={openedAccordion === "1"}
                            methods={form}
                            name="discount.reason"
                            label="Sababi"
                            className="!w-full"
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className="flex justify-end">
                <Button type="submit" disabled={isPending} loading={isPending}>
                    Saqlash
                </Button>
            </div>
        </form>
    )
}

export default AddGroup
