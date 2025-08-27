import { DataTable } from "@/components/ui/datatable"
import { useColumns } from "./columns"
import { useGet } from "@/hooks/useGet"
import { GROUP_STUDENTS, STUDENT_GROUP } from "@/constants/api-endpoints"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Modal from "@/components/custom/modal"
import { useModal } from "@/hooks/useModal"
import { useState, useCallback } from "react"

import { useParams } from "@tanstack/react-router"
import DeleteModal from "@/components/custom/delete-modal"
import UpdateStudentDate from "./update-date"
import AddGroup from "./add-group"
import { formatMoney } from "@/lib/format-money"

function StudentGroupMain() {
    const { id } = useParams({ from: "/_main/students/$id/_main/groups" })
    const { openModal: openDelete } = useModal("delete-student-group")
    const { openModal } = useModal("student-groups-add")
    const { openModal: openModalUpdate } = useModal("student-groups-update")
    const [current, setCurrent] = useState<Student>()

    const { data: studentGroups, isLoading } = useGet<ListResp<Student>>(
        STUDENT_GROUP,
        {
            params: { student: id },
            options: { enabled: !!id },
        },
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

    return (
        <div className="mt-1">
            <div className="flex mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium">Guruhlar ro'yxati</h1>
                    <Badge className="text-sm">{formatMoney(studentGroups?.count)}</Badge>
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
                <AddGroup />
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
