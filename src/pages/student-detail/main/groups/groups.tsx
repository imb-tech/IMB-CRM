import { DataTable } from "@/components/ui/datatable"
import { useGet } from "@/hooks/useGet"
import { GROUP_STUDENTS, STUDENT_GROUP } from "@/constants/api-endpoints"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Modal from "@/components/custom/modal"
import { useModal } from "@/hooks/useModal"
import { useCallback } from "react"

import { useParams } from "@tanstack/react-router"
import DeleteModal from "@/components/custom/delete-modal"
import { formatMoney } from "@/lib/format-money"
import { useStore } from "@/hooks/use-store"
import AddGroup from "./add-group"
import { ColorfulCourseCard } from "./cards"

function StudentGroupMain() {
    const { id } = useParams({ from: "/_main/students/$id/_main/groups" })
    const { openModal: openDelete } = useModal("delete-student-group")
    const { openModal } = useModal("student-groups-add")
    const { store: current, setStore } = useStore<Student | null>(
        "student-groups-add",
    )

    const { data: studentGroups } = useGet<ListResp<Student>>(
        STUDENT_GROUP,
        {
            params: { student: id },
            options: { enabled: !!id },
        },
    )

    const handleDelete = useCallback(
        (item: Student) => {
            setStore(item)
            openDelete()
        },
        [openDelete],
    )

    return (
        <div className="mt-1">
            <div className="flex mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium">Guruhlar ro'yxati</h1>
                    <Badge className="text-sm">
                        {formatMoney(studentGroups?.count)}
                    </Badge>
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

            <div className="grid lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 items-start  gap-4">
                {studentGroups?.results?.map((item) => (
                <ColorfulCourseCard onDelete={handleDelete} key={item.id} item={item} />
            ))}
            </div>

            {/* Add Group modal */}
            <Modal title="Guruhga qo'shish" modalKey="student-groups-add">
                <AddGroup id={id} />
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
