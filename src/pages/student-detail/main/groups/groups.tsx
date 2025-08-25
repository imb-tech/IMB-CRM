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
import { useState } from "react"
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

type Props = {}

function StudentGroupMain({}: Props) {
    const { id } = useParams({ from: "/_main/students/$id/_main/groups" })
    const queryClient = useQueryClient()
    const { openModal: openDelete } = useModal("delete-student-group")
    const { closeModal, openModal, isOpen } = useModal(`student-groups-add`)
    const { openModal: openModalUpdate } = useModal(`student-groups-update`)
    const [search, setSearch] = useState<string>("")
    const [openedAccordion, setOpenedAccordion] = useState<string | null>(null)
    const { active_branch } = useMe()
    const [current, setCurrent] = useState<Student>()

    const { data, isLoading } = useGet<ListResp<Student>>(STUDENT_GROUP, {
        params: { student: id },
        options: { enabled: !!id },
    })
    const { data: dataGroups } = useGet<Group[]>(OPTION_GROUPS, {
        params: { search, branch: active_branch },
        options: { enabled: !!isOpen },
    })

    function onSuccess() {
        toast.success("Muvaffaqiyatli qo'shildi")
        closeModal()
        form.reset()
        queryClient.invalidateQueries({
            queryKey: [STUDENT_GROUP],
        })
    }

    const { mutate, isPending } = usePost({ onSuccess })

    const form = useForm<GroupStudentCreate>({
        defaultValues: {
            status: 1,
            start_date: format(new Date(), "yyyy-MM-dd"),
        },
    })

    const onSubmit = (values: GroupStudentCreate) => {
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
                        errors.group_students.forEach((studentError: any) => {
                            Object.entries(studentError).forEach(
                                ([field, messages]) => {
                                    form.setError(`${field}` as any, {
                                        type: "manual",
                                        message: (messages as string[]).join(
                                            " ",
                                        ),
                                    })
                                },
                            )
                        })
                    } else {
                        toast.error(
                            "Xatolik yuz berdi qaytadan urinib ko'ring!",
                        )
                    }
                },
            },
        )
    }

    const handleDelete = (item: Student) => {
        openDelete()
        setCurrent(item)
    }

    const columns = useColumns({
        openModal: openModalUpdate,
        setCurrent: (student) => setCurrent(student),
    })



    return (
        <div className="mt-1">
            <div className="flex  mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium ">
                        {"Guruhlar ro'yxati"}
                    </h1>
                    <Badge className="text-sm">{data?.count}</Badge>
                </div>
                <Button
                    type="button"
                    onClick={openModal}
                    className="flex gap-1"
                >
                    <Plus className="w-5 h-5" />
                    <span className="sm:block hidden">
                        {"Guruhga qo'shish"}
                    </span>
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={data?.results}
                loading={isLoading}
                onDelete={(item) => handleDelete(item.original)}
                numeration
                viewAll
            />
            <Modal title={"Guruhga qo'shish"} modalKey={`student-groups-add`}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-1 px-1"
                >
                    <FormCombobox
                        control={form.control}
                        name="group"
                        options={dataGroups?.map((item) => ({
                            name: `${item.name} - ${item.teacher_name} - ${
                                item.is_active ? "Aktiv" : "O'chirilgan"
                            }`,
                            id: item.id,
                        }))}
                        labelKey="name"
                        onSearchChange={(v) => setSearch(v)}
                        valueKey="id"
                        label="Guruh tanlang"
                        required
                    />
                    <div className="grid grid-cols-2 items-end gap-3">
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
                            name="status"
                            labelKey="name"
                            valueKey="id"
                            label="Holati"
                            required
                        />

                        <FormDatePicker
                            control={form.control}
                            name="start_date"
                            label="Qo'shilish sanasi"
                            className="!w-full"
                            required
                            fullWidth
                        />
                    </div>

                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        onValueChange={(value) => setOpenedAccordion(value)}
                    >
                        <AccordionItem value={"1"}>
                            <AccordionTrigger className="px-3">
                                Chegirma berish
                            </AccordionTrigger>
                            <AccordionContent className="flex pl-3 mt-2 flex-col px-1 gap-3 text-balance ">
                                <FormNumberInput
                                    required={openedAccordion === "1"}
                                    control={form.control}
                                    name={`discount.amount`}
                                    label={"Chegirma narxi"}
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

            <Modal
                modalKey="student-groups-update"
                title="Tahrirlash"
                size="max-w-md"
            >
                <UpdateStudentDate current={current} />
            </Modal>

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
