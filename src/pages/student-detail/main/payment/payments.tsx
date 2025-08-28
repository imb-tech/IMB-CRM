import { DataTable } from "@/components/ui/datatable"
import { useColumns } from "./columns"
import { useGet } from "@/hooks/useGet"
import {
    GROUP_STUDENTS_PAYMENT,
    STUDENT_GROUP,
} from "@/constants/api-endpoints"
import { Badge } from "@/components/ui/badge"
import { formatMoney } from "@/lib/format-money"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useCallback, useMemo, useState } from "react"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import StudentGroupHeader from "./group-header"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Modal from "@/components/custom/modal"
import PaymentUpdate from "./payment-update"
import { useModal } from "@/hooks/useModal"
import DeleteModal from "@/components/custom/delete-modal"
import { toast } from "sonner"

const StudnetPaymentMain = () => {
    const { id } = useParams({ from: "/_main/students/$id/_main/payments" })
    const search = useSearch({ from: "__root__" })
    const { group_student, ...updateSearch } = search
    const navigate = useNavigate()
    const [isAll, setIsAll] = useState(false)
    const [current, setCurrent] = useState<GroupStudentPayments | null>(null)
    const { openModal } = useModal("payment-update")

    const { data: studentGroups } = useGet<ListResp<Student>>(STUDENT_GROUP, {
        params: { student: id, size: 50, page: 1 },
        options: { enabled: !!id && isAll },
    })

    const { data: groupPayments, isLoading } = useGet<
        ListResp<GroupStudentPayments>
    >(GROUP_STUDENTS_PAYMENT, {
        params: {
            ...updateSearch,
            student: id,
            ...(isAll ? { group_student } : {}),
        },
        options: { enabled: !isAll || !!group_student },
    })

    const handleAccordionChange = useCallback(
        (key: string) => {
            navigate({
                to: "/students/$id/payments",
                params: { id },
                search: (prev) => ({
                    ...prev,
                    group_student: prev.group_student === key ? undefined : key,
                }),
            })
        },
        [navigate, id],
    )

    const handleAddPayment = useCallback(() => {
        setCurrent(null)
        openModal()
    }, [openModal])

    const handleSwitchChange = useCallback(
        (value: boolean) => {
            setIsAll(value)
            navigate({ to: "/students/$id/payments", params: { id } })
        },
        [navigate, id],
    )

    const renderAccordionList = useMemo(() => {
        if (!studentGroups?.results) return null
        return studentGroups.results.map((item, idx) => (
            <Accordion
                key={item.id}
                type="single"
                collapsible
                className="w-full"
                value={group_student ?? undefined}
                onValueChange={handleAccordionChange}
            >
                <AccordionItem value={item.id.toString()}>
                    <AccordionTrigger className="px-3">
                        <StudentGroupHeader data={item} />
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance pl-3">
                        <PaymenTable
                            data={groupPayments}
                            isLoading={isLoading}
                            isGroup={false}
                            current={current}
                            setCurrent={setCurrent}
                            openModal={openModal}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        ))
    }, [
        studentGroups,
        group_student,
        groupPayments,
        isLoading,
        current,
        openModal,
        handleAccordionChange,
    ])

    return (
        <div className="mt-1">
            <div className="flex mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium">To'lovlar tarxi</h1>
                    <Badge className="text-sm">
                        {formatMoney(studentGroups?.count)}
                    </Badge>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={isAll}
                            onCheckedChange={handleSwitchChange}
                        />
                        <Label>Guruhlar kesmi bo'yicha</Label>
                    </div>
                    <Button
                        type="button"
                        onClick={handleAddPayment}
                        className="flex gap-1"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="sm:block hidden">
                            To'lovni amalga oshirish
                        </span>
                    </Button>
                </div>
            </div>

            {isAll ? (
                <div>
                    <div className="grid grid-cols-4 px-3 border-b py-3 mb-2 bg-muted rounded-md text-muted-foreground text-sm">
                        <p>Guruh nomi</p>
                        <p>Guruhdagi holati</p>
                        <p>Balansi</p>
                        <p>Keyingi to'lov sanasi</p>
                    </div>
                    {renderAccordionList}
                </div>
            ) : (
                <PaymenTable
                    data={groupPayments}
                    isLoading={isLoading}
                    isGroup={true}
                    current={current}
                    setCurrent={setCurrent}
                    openModal={openModal}
                />
            )}
            <Modal
                modalKey="payment-update"
                title={current?.id ? "To'lovni tahrirlash" : "To'lov qo'shish"}
            >
                <PaymentUpdate current={current} />
            </Modal>
            <DeleteModal
                id={current?.id}
                modalKey="delete-student-payment"
                path={GROUP_STUDENTS_PAYMENT}
            />
        </div>
    )
}

export default StudnetPaymentMain

type PropsTable = {
    isLoading: boolean
    data: ListResp<GroupStudentPayments> | undefined
    isGroup: boolean
    openModal: () => void
    setCurrent: (val: GroupStudentPayments) => void
    current: GroupStudentPayments | null
}

const PaymenTable = ({
    data,
    isLoading,
    isGroup,
    current,
    openModal,
    setCurrent,
}: PropsTable) => {
    const { openModal: openDelete } = useModal("delete-student-payment")

    const handleUpdate = useCallback(
        (item: GroupStudentPayments) => {
            if (item?.id) {
                setCurrent(item)
                openModal()
            }
        },
        [openModal, setCurrent],
    )

    const columns = useColumns({ isGroup })

    const handleDelete = useCallback(
        (item: GroupStudentPayments) => {
            if (item.condition === 2)
                return toast.error("Qarzdorlikni  o'chira olmaysiz!")
            setCurrent(item)
            openDelete()
        },
        [openDelete],
    )

    return (
        <div className="mt-1">
            <DataTable
                columns={columns}
                data={data?.results}
                loading={isLoading}
                numeration
                onEdit={(item) => handleUpdate(item.original)}
                onDelete={(item) => handleDelete(item.original)}
                paginationProps={{
                    totalPages: data?.total_pages,
                }}
                setRowClassName={(row) =>
                    row.condition === 1 ? "" : "bg-red-500/10 text-red-500"
                }
            />
        </div>
    )
}
