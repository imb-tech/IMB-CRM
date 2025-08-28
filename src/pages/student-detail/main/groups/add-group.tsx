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
import { useForm } from "react-hook-form"
import { FormCombobox } from "@/components/form/combobox"
import { FormSelect } from "@/components/form/select"
import { FormDatePicker } from "@/components/form/date-picker"
import { useParams } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useModal } from "@/hooks/useModal"
import { useCallback, useMemo, useState } from "react"
import useMe from "@/hooks/useMe"
import {
    GROUP_STUDENTS,
    OPTION_GROUPS,
    STUDENT_GROUP,
} from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { Button } from "@/components/ui/button"
import showFormErrors from "@/lib/show-form-errors"

type Props = {}

function AddGroup({}: Props) {
    const { id } = useParams({ from: "/_main/students/$id/_main/groups" })
    const queryClient = useQueryClient()
    const { closeModal } = useModal("student-groups-add")
    const [search, setSearch] = useState("")
    const { active_branch } = useMe()
    const [openedAccordion, setOpenedAccordion] = useState<string | null>(null)

    const { data: groupsOptions } = useGet<Group[]>(OPTION_GROUPS, {
        params: { search, branch: active_branch },
    })

    const form = useForm<GroupStudentCreate>({
        defaultValues: {
            status: 1,
            start_date: format(new Date(), "yyyy-MM-dd"),
        },
    })

    const onSuccess = useCallback(() => {
        toast.success("Muvaffaqiyatli qo'shildi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({ queryKey: [STUDENT_GROUP] })
    }, [closeModal, form, queryClient])

    const { mutate, isPending } = usePost({ onSuccess })

    const onSubmit = useCallback(
        (values: GroupStudentCreate) => {
            const { discount, ...rest } = values
            const body = {
                ...rest,
                student: id,
                is_group: true,
                ...(discount?.amount && discount?.reason ? { discount } : {}),
            }

            mutate(
                GROUP_STUDENTS,
                { group_students: [body] },
                { onError: (err) => showFormErrors(err, form) },
            )
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
            <div className="grid grid-cols-2 items-start gap-3">
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
