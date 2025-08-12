import { DataTable } from "@/components/ui/datatable"
import { useColumns } from "./columns"
import { useGet } from "@/hooks/useGet"
import { COURSE } from "@/constants/api-endpoints"
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

type Props = {}

const StudnetPaymentMain = (props: Props) => {
    const { id } = useParams({ strict: false }) as { id: string }
    const search: any = useSearch({ strict: false })
    const navigate = useNavigate()
    const [isAll, setIsAll] = useState<boolean>(false)
    const { data, isFetching } = useGet<ListResp<Course>>(COURSE)

    const clickAccordion = useCallback(
        (key: string) => {
            navigate({
                to: "/students/$id/payments",
                params: { id },
                search: (prev) => ({
                    ...prev,
                    tab: search.tab === key ? undefined : key,
                }),
            })
        },
        [navigate, id, search.tab],
    )

    return (
        <div className="mt-4">
            <div className="flex  mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium ">
                        {"To'lovlar tarxi "}
                    </h1>
                    <Badge className="text-sm">
                        {formatMoney(group?.length)}
                    </Badge>
                </div>
                <div className="flex items-center gap-5">
                    <div className=" flex items-center gap-2 ">
                        <Switch
                            checked={isAll}
                            onCheckedChange={(e) => setIsAll(e)}
                        />
                        <Label>{"Barchasi"}</Label>
                    </div>
                    <Button variant={"secondary"} className="flex gap-1">
                        <Plus className="w-5 h-5" />
                        <span className="sm:block hidden">
                            {"To'lovni amalga oshirish"}
                        </span>
                    </Button>
                </div>
            </div>

            {!isAll ? (
                <div>
                    <div className="grid grid-cols-2 px-3  border-b pb-3 text-primary gap-14 w-full text-[16px] text-start">
                        <p className="font-medium">Guruh nomi</p>
                        <p className="font-medium">Balans</p>
                    </div>
                    {group?.map((item, index) => (
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            value={search?.tab ?? undefined}
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
                                <AccordionContent className="flex  flex-col gap-4 text-balance">
                                    <PaymenTable
                                        data={payments}
                                        isFetching
                                        isGroup={false}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            ) : (
                <PaymenTable data={payments} isFetching isGroup={true} />
            )}
        </div>
    )
}

export default StudnetPaymentMain

type PropsTable = {
    isFetching: boolean
    data: AllPaymentStudent[]
    isGroup: boolean
}

const PaymenTable = ({ data, isFetching, isGroup }: PropsTable) => {
    const columns = useColumns({ isGroup })
    return (
        <div className="mt-4">
            <DataTable
                columns={columns}
                data={data}
                // loading={isFetching}
                numeration
                onEdit={() => {}}
                viewAll={!isGroup}
            />
        </div>
    )
}

const group = [
    {
        id: 1,
        name: "Ingliz tili guruh-3",
        balans: 120000,
    },
    {
        id: 2,
        name: "Geografiya guruh-1",
        balans: 120000,
    },
    {
        id: 3,
        name: "Tarix guruh-1",
        balans: 120000,
    },
    {
        id: 4,
        name: "Biologiya guruh-2",
        balans: 120000,
    },
]

const payments: AllPaymentStudent[] = [
    {
        date: "2025-08-01",
        type: "Oylik to'lov",
        amount: 500000,
        returned_amount: 0,
        bonus: 50000,
        group: "Matematika guruh-1",
        comment: "Avgust oyi uchun to'lov",
        created_at: "2025-08-01 09:30",
        payment_type: "Naqd",
        received_by: "Ali Karimov",
    },
    {
        date: "2025-08-02",
        type: "Oylik to'lov",
        amount: 450000,
        returned_amount: 0,
        bonus: 0,
        group: "Ingliz tili guruh-2",
        comment: "Oylik to'lov",
        created_at: "2025-08-02 14:15",
        payment_type: "Karta",
        received_by: "Dilnoza Karimova",
    },
    {
        date: "2025-08-03",
        type: "Qo'shimcha dars",
        amount: 100000,
        returned_amount: 0,
        bonus: 0,
        group: "Fizika guruh-1",
        comment: "1 soatlik qo'shimcha dars",
        created_at: "2025-08-03 11:20",
        payment_type: "Naqd",
        received_by: "Bekzod Tursunov",
    },
    {
        date: "2025-08-04",
        type: "Oylik to'lov",
        amount: 480000,
        returned_amount: 30000,
        bonus: 20000,
        group: "Kimyo guruh-3",
        comment: "Qisman qaytarildi",
        created_at: "2025-08-04 16:05",
        payment_type: "Payme",
        received_by: "Malika Tursunova",
    },
    {
        date: "2025-08-05",
        type: "Oylik to'lov",
        amount: 500000,
        returned_amount: 0,
        bonus: 50000,
        group: "Matematika guruh-2",
        comment: "To'liq to'landi",
        created_at: "2025-08-05 10:40",
        payment_type: "Click",
        received_by: "Javlon Qodirov",
    },
    {
        date: "2025-08-06",
        type: "Qo'shimcha to'lov",
        amount: 150000,
        returned_amount: 0,
        bonus: 0,
        group: "Informatika guruh-1",
        comment: "Kitob va materiallar uchun",
        created_at: "2025-08-06 13:00",
        payment_type: "Naqd",
        received_by: "Nigora Qodirova",
    },
    {
        date: "2025-08-07",
        type: "Oylik to'lov",
        amount: 470000,
        returned_amount: 0,
        bonus: 30000,
        group: "Biologiya guruh-2",
        comment: "Oylik to'lov",
        created_at: "2025-08-07 12:50",
        payment_type: "Karta",
        received_by: "Sherzod Abdurahmonov",
    },
    {
        date: "2025-08-08",
        type: "Oylik to'lov",
        amount: 490000,
        returned_amount: 10000,
        bonus: 0,
        group: "Tarix guruh-1",
        comment: "Chegirma berildi",
        created_at: "2025-08-08 15:25",
        payment_type: "Payme",
        received_by: "Gulbahor Abdurahmonova",
    },
    {
        date: "2025-08-09",
        type: "Oylik to'lov",
        amount: 500000,
        returned_amount: 0,
        bonus: 0,
        group: "Geografiya guruh-1",
        comment: "Oylik to'lov",
        created_at: "2025-08-09 09:10",
        payment_type: "Click",
        received_by: "Rustam Xolmatov",
    },
    {
        date: "2025-08-10",
        type: "Imtihon to'lovi",
        amount: 200000,
        returned_amount: 0,
        bonus: 0,
        group: "Ingliz tili guruh-3",
        comment: "Yakuniy imtihon uchun",
        created_at: "2025-08-10 14:55",
        payment_type: "Naqd",
        received_by: "Saida Xolmatova",
    },
]
