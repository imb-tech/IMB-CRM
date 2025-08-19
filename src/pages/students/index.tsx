import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useStudentsCols } from "./columns"
import { useModal } from "@/hooks/useModal"
import { useState } from "react"
import Modal from "@/components/custom/modal"
import StudentCreate from "./create"
import DeleteModal from "@/components/custom/delete-modal"
import { STUDENT } from "@/constants/api-endpoints"
import { useNavigate, useSearch } from "@tanstack/react-router"
import StudentsFilter from "./students-filter"
import { useGet } from "@/hooks/useGet"
import { formatMoney } from "@/lib/format-money"
import ParamSwtich from "@/components/as-params/switch"

const StudentsMain = () => {
    const { openModal: openModalStudent } = useModal(`${STUDENT}-add`)
    const { openModal: openModalDelete } = useModal(`${STUDENT}-delete`)
    const [current, setCurrent] = useState<Student | null>(null)
    const navigate = useNavigate()

    const params = useSearch({ from: "/_main/students/" })

    const { data, isFetching } = useGet<ListResp<Student>>("students", {
        params,
    })

    const handleItemAdd = () => {
        setCurrent(null)
        openModalStudent()
    }
    const handleItemEdit = (item: Student) => {
        if (item.id) {
            setCurrent(item)
            openModalStudent()
        }
    }
    const handleItemDelete = (item: Student) => {
        if (item.id) {
            setCurrent(item)
            openModalDelete()
        }
    }

    
    const columns = useStudentsCols()

    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <div className="flex  justify-between items-center gap-3 ">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl">O'quvchilar</h1>
                            <Badge className="text-sm">{data?.count}</Badge>
                            {Number(data?.total_debts) < 0 && (
                                <Badge
                                    className="text-sm text-red-600 bg-red-600/10  border-[0.7px] border-destructive font-normal"
                                    variant={"outline"}
                                >
                                    Qazdorlik:
                                    <span className="pl-2">
                                        {formatMoney(
                                            Number(data?.total_debts ?? 0),
                                        )}
                                    </span>
                                </Badge>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <ParamSwtich
                                label="Arxiv"
                                paramName="is_active"
                                reverse
                            />
                            <Button className="bg-orange-500/10 hover:bg-orange-500/15 text-orange-500">
                                <Plus className="h-4 w-4" />
                                SMS YUBORISH
                            </Button>
                            <Button onClick={handleItemAdd}>
                                <Plus className="h-4 w-4" />
                                Yaratish
                            </Button>
                        </div>
                    </div>
                    <StudentsFilter />
                    <DataTable
                        columns={columns}
                        data={data?.results}
                        loading={isFetching}
                        onRowClick={({ id }) =>
                            navigate({
                                to: "/students/$id/groups",
                                params: { id: id.toString() },
                            })
                        }
                        onEdit={(row) => handleItemEdit(row.original)}
                        onDelete={(row) => handleItemDelete(row.original)}
                        selecteds_row
                        numeration
                        hasFixedRowCount={false}
                    />
                </CardContent>
            </Card>

            <Modal
                modalKey={`${STUDENT}-add`}
                title={`O'quvchi ${current?.id ? "tahrirlash" : "yaratish"}`}
            >
                <div className="max-h-[75vh] overflow-y-auto no-scrollbar-x">
                    <StudentCreate item={current} />
                </div>
            </Modal>
            <DeleteModal
                modalKey={`${STUDENT}-delete`}
                id={current?.id}
                path={STUDENT}
            />
        </div>
    )
}

export default StudentsMain
