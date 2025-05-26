import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { Plus } from "lucide-react"
import { useHolidaysCols } from "./columns"
import { Badge } from "@/components/ui/badge"
import Modal from "@/components/custom/modal"
import HolidayCreate from "./create"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { useState } from "react"
import { HOLIDAY } from "@/constants/api-endpoints"

const HolidaysMain = () => {
    const { openModal: openModalHoliday } = useModal(`${HOLIDAY}-add`)
    const { openModal: openModalDelete } = useModal(`${HOLIDAY}-delete`)
    const [current, setCurrent] = useState<Holiday | null>(null)

    const handleItemAdd = () => {
        setCurrent(null)
        openModalHoliday()
    }
    const handleItemEdit = (item: Holiday) => {
        if (item.id) {
            setCurrent(item)
            openModalHoliday()
        }
    }
    const handleItemDelete = (item: Holiday) => {
        if (item.id) {
            setCurrent(item)
            openModalDelete()
        }
    }

    const columns = useHolidaysCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <div className="flex  justify-between items-center gap-3 ">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl">Dam olish kunlari</h1>
                            <Badge variant={"outline"} className="text-sm">
                                {data.length}
                            </Badge>
                        </div>
                        <Button onClick={handleItemAdd}>
                            <Plus className="h-4 w-4" />
                            Qo'shish
                        </Button>
                    </div>
                    <DataTable
                        onDelete={(row) => handleItemDelete(row.original)}
                        onEdit={(row) => handleItemEdit(row.original)}
                        columns={columns}
                        data={data}
                    />
                </CardContent>
            </Card>
            <Modal
                modalKey={`${HOLIDAY}-add`}
                title={`Dam olish kun ${
                    current?.id ? "tahrirlash" : "qo'shish"
                }`}
            >
                <HolidayCreate item={current} />
            </Modal>
            <DeleteModal
                modalKey={`${HOLIDAY}-delete`}
                id={current?.id}
                path={HOLIDAY}
            />
        </div>
    )
}

export default HolidaysMain

const data: Holiday[] = [
    { id: 1, date: "2025-01-01", reason: "New Year" },
    { id: 2, date: "2025-01-14", reason: "Defenders Day" },
    { id: 3, date: "2025-03-08", reason: "Women's Day" },
    { id: 4, date: "2025-03-21", reason: "Navruz" },
    { id: 5, date: "2025-04-10", reason: "Eid al-Fitr" },
    { id: 6, date: "2025-04-11", reason: "Eid al-Fitr (Day 2)" },
    { id: 7, date: "2025-05-09", reason: "Victory Day" },
    { id: 8, date: "2025-06-16", reason: "Eid al-Adha" },
    { id: 9, date: "2025-06-17", reason: "Eid al-Adha (Day 2)" },
    { id: 10, date: "2025-09-01", reason: "Independence Day" },
    { id: 11, date: "2025-10-01", reason: "Teachers Day" },
    { id: 12, date: "2025-12-08", reason: "Constitution Day" },
    { id: 13, date: "2025-01-02", reason: "New Year (Extra)" },
    { id: 14, date: "2025-03-22", reason: "Navruz (Extra)" },
    { id: 15, date: "2025-04-12", reason: "Eid Weekend" },
    { id: 16, date: "2025-05-10", reason: "Victory Weekend" },
    { id: 17, date: "2025-06-18", reason: "Eid Holiday" },
    { id: 18, date: "2025-09-02", reason: "Independence Weekend" },
    { id: 19, date: "2025-12-09", reason: "Constitution Holiday" },
    { id: 20, date: "2025-07-01", reason: "Medical Workers Day" },
    { id: 21, date: "2025-08-30", reason: "Public Holiday" },
    { id: 22, date: "2025-02-14", reason: "Culture Day" },
    { id: 23, date: "2025-11-10", reason: "Science Day" },
    { id: 24, date: "2025-05-15", reason: "Family Day" },
    { id: 25, date: "2025-10-20", reason: "Youth Day" },
]
