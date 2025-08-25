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
import { useCallback, useState } from "react"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import StudentGroupHeader from "./group-header"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Modal from "@/components/custom/modal"
import PaymentUpdate from "./payment-update"
import { useModal } from "@/hooks/useModal"

const StudnetPaymentMain = () => {
    const { id } = useParams({ from: "/_main/students/$id/_main/payments" })
    const search = useSearch({ from: "__root__" })
    const { group_student, ...updateSearch } = search
    const navigate = useNavigate()
    const [isAll, setIsAll] = useState<boolean>(false)

    const { data } = useGet<ListResp<Student>>(STUDENT_GROUP, {
        params: { student: id, size: 50, page: 1 },
        options: { enabled: !!id && isAll },
    })

    const { data: dataGroupPayment, isLoading } = useGet<
        ListResp<GroupStudentPayments>
    >(GROUP_STUDENTS_PAYMENT, {
        params: {
            ...updateSearch,
            ...(isAll ? { group_student } : {}),
        },
        options: { enabled: !isAll || !!group_student },
    })

    const clickAccordion = useCallback(
        (key: string) => {
            navigate({
                to: "/students/$id/payments",
                params: { id },
                search: (prev) => ({
                    ...prev,
                    group_student:
                        search.group_student === key ? undefined : key,
                }),
            })
        },
        [navigate, id, search.group_student],
    )

    return (
        <div className="mt-1">
            <div className="flex  mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium ">
                        {"To'lovlar tarxi "}
                    </h1>
                    <Badge className="text-sm">
                        {formatMoney(data?.count)}
                    </Badge>
                </div>
                <div className="flex items-center gap-5">
                    <div className=" flex items-center gap-2 ">
                        <Switch
                            checked={isAll}
                            onCheckedChange={(e) => {
                                setIsAll(e)
                                navigate({
                                    to: "/students/$id/payments",
                                    params: { id },
                                })
                            }}
                        />
                        <Label>{"Guruhlar kesmi bo'yicha"}</Label>
                    </div>
                    <Button className="flex gap-1">
                        <Plus className="w-5 h-5" />
                        <span className="sm:block hidden">
                            {"To'lovni amalga oshirish"}
                        </span>
                    </Button>
                </div>
            </div>

            {isAll ? (
                <div>
                    <div className="grid grid-cols-4 px-3  border-b py-3 mb-2 bg-muted rounded-md  text-muted-foreground text-sm">
                        <p>Guruh nomi</p>
                        <p>Guruhdagi holati</p>
                        <p>Balansi</p>
                        <p>Keyingi to'lov sanasi</p>
                    </div>
                    {data?.results?.map((item, index) => (
                        <Accordion
                            key={index}
                            type="single"
                            collapsible
                            className="w-full"
                            value={group_student ?? undefined}
                            onValueChange={(val) => {
                                clickAccordion(val)
                            }}
                        >
                            <AccordionItem value={item?.id?.toString()}>
                                <AccordionTrigger className="px-3">
                                    <StudentGroupHeader
                                        data={item}
                                        key={index}
                                    />
                                </AccordionTrigger>
                                <AccordionContent className="flex   flex-col gap-4 text-balance pl-3">
                                    <PaymenTable
                                        data={dataGroupPayment}
                                        isLoading={isLoading}
                                        isGroup={false}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            ) : (
                <PaymenTable
                    data={dataGroupPayment}
                    isLoading={isLoading}
                    isGroup={true}
                />
            )}
        </div>
    )
}

export default StudnetPaymentMain

type PropsTable = {
    isLoading: boolean
    data: ListResp<GroupStudentPayments> | undefined
    isGroup: boolean
}

const PaymenTable = ({ data, isLoading, isGroup }: PropsTable) => {
    const [current, setCurrent] = useState<GroupStudentPayments>()
    const { openModal } = useModal("payment-update")

    const handleUpdate = (item: GroupStudentPayments) => {
        if (item?.id) {
            openModal()
            setCurrent(item)
        }
    }

    const columns = useColumns({ isGroup })

    return (
        <div className="mt-1">
            <DataTable
                columns={columns}
                data={data?.results}
                loading={isLoading}
                numeration
                onEdit={(item) => handleUpdate(item.original)}
                paginationProps={{
                    totalPages: data?.total_pages,
                }}
                setRowClassName={(row) =>
                    row.condition === 1 ? "" : "bg-red-500/10 text-red-500 "
                }
            />
            <Modal modalKey="payment-update" title={"To'lovni tahrirlash"}>
                <PaymentUpdate current={current} />
            </Modal>
        </div>
    )
}
