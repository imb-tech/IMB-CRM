import { DataTable } from "@/components/ui/datatable"
import { useColumns } from "./columns"
import { useGet } from "@/hooks/useGet"
import {
    GROUP_STUDENTS,
    OPTION_GROUPS,
    STUDENT_GROUP,
} from "@/constants/api-endpoints"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import Modal from "@/components/custom/modal"
import { FormCombobox } from "@/components/form/combobox"
import { FormSelect } from "@/components/form/select"
import { FormDatePicker } from "@/components/form/date-picker"
import { useQueryClient } from "@tanstack/react-query"
import { useModal } from "@/hooks/useModal"
import { useState, useCallback, useMemo } from "react"
import useMe from "@/hooks/useMe"
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
import { useParams } from "@tanstack/react-router"
import { format } from "date-fns"
import DeleteModal from "@/components/custom/delete-modal"
import UpdateStudentDate from "./update-student"

function StudentGroupMain() {
    const { id } = useParams({ from: "/_main/students/$id/_main/groups" })
    const queryClient = useQueryClient()
    const { openModal: openDelete } = useModal("delete-student-group")
    const { closeModal, openModal, isOpen } = useModal("student-groups-add")
    const { openModal: openModalUpdate } = useModal("student-groups-update")
    const [search, setSearch] = useState("")
    const { active_branch } = useMe()
    const [openedAccordion, setOpenedAccordion] = useState<string | null>(null)
    const [current, setCurrent] = useState<Student>()

    const { data: studentGroups, isLoading } = useGet<ListResp<Student>>(
        STUDENT_GROUP,
        {
            params: { student: id },
            options: { enabled: !!id },
        },
    )

    const { data: groupsOptions } = useGet<Group[]>(OPTION_GROUPS, {
        params: { search, branch: active_branch },
        options: { enabled: !!isOpen },
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
                {
                    onError: (err) => {
                        const errors = err?.response?.data || err?.data
                        if (
                            errors?.group_students &&
                            Array.isArray(errors.group_students)
                        ) {
                            errors.group_students.forEach(
                                (studentError: any) => {
                                    Object.entries(studentError).forEach(
                                        ([field, messages]) => {
                                            form.setError(field as any, {
                                                type: "manual",
                                                message: (
                                                    messages as string[]
                                                ).join(" "),
                                            })
                                        },
                                    )
                                },
                            )
                        } else {
                            toast.error(
                                "Xatolik yuz berdi qaytadan urinib ko'ring!",
                            )
                        }
                    },
                },
            )
        },
        [mutate, id, form],
    )

    const handleDelete = useCallback(
        (item: Student) => {
            setCurrent(item)
            openDelete()
        },
        [openDelete],
    )

    const columns = useColumns({
        openModal: openModalUpdate,
        setCurrent,
    })

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
        <div className="mt-1">
            <div className="flex mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium">Guruhlar ro'yxati</h1>
                    <Badge className="text-sm">{studentGroups?.count}</Badge>
                </div>
                <Button
                    type="button"
                    onClick={openModal}
                    className="flex gap-1"
                >
                    <Plus className="w-5 h-5" />
                    <span className="sm:block hidden">Guruhga qo'shish</span>
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={studentGroups?.results}
                loading={isLoading}
                onDelete={(item) => handleDelete(item.original)}
                numeration
                viewAll
            />

            {/* Add Group Modal */}
            <Modal title="Guruhga qo'shish" modalKey="student-groups-add">
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
                    <div className="grid grid-cols-2 items-end gap-3">
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
                        <Button disabled={isPending} loading={isPending}>
                            Saqlash
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Update Group Modal */}
            <Modal
                modalKey="student-groups-update"
                title="Tahrirlash"
                size="max-w-md"
            >
                <UpdateStudentDate current={current} />
            </Modal>

            {/* Delete Group Modal */}
            <DeleteModal
                id={current?.id}
                modalKey="delete-student-group"
                path={GROUP_STUDENTS}
                refetchKeys={[STUDENT_GROUP]}
            />
        </div>
    )
}

export default StudentGroupMain
