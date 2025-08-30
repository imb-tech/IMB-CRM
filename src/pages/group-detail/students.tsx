import { DataTable } from "@/components/ui/datatable"
import { useGroupStudentCols } from "./cols"
import SectionHeader from "@/components/elements/section-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useGet } from "@/hooks/useGet"
import { GROUP_STUDENTS } from "@/constants/api-endpoints"
import { useParams, useSearch } from "@tanstack/react-router"
import Modal from "@/components/custom/modal"
import { useModal } from "@/hooks/useModal"
import ParamInput from "@/components/as-params/input"
import UpdateStudent from "./update-student"
import DeleteModal from "@/components/custom/delete-modal"
import { useStore } from "@/hooks/use-store"
import AppendStudentModal from "./append-student-modal"
import ParamSwtich from "@/components/as-params/switch"
import { useQueryClient } from "@tanstack/react-query"
import PaymentUpdate from "../student-detail/main/payment/payment-update"
import ExportStudent from "./export-student"
import apiGroupStudents from "@/services/hooks/use-group-students"

export default function GroupStudents() {
    const { id: group } = useParams({
        from: "/_main/groups/$id/_main/students",
    })
    const search = useSearch({ from: "/_main/groups/$id/_main/students" })
    const { openModal } = useModal("append-student")
    const { store, remove } = useStore<GroupStudent>("student-data")

    const queryClient = useQueryClient()

    const { data, refetch: refetchOrg } = apiGroupStudents(group)

    function invalidateQueries() {
        queryClient.invalidateQueries({
            queryKey: [
                "platform/group-students/attendances/" +
                group +
                "/" +
                search.date,
                true,
            ],
        })
    }

    function refetch() {
        refetchOrg()
        invalidateQueries()
    }

    const columns = useGroupStudentCols()

    return (
        <div>
            <SectionHeader
                title="Guruhdagi o'quvchilar"
                rightComponent={
                    <div className="flex items-center gap-1">
                        <ParamSwtich
                            label="Arxiv"
                            paramName="is_active"
                            reverse
                        />
                        <ParamInput />
                        <Button onClick={openModal}>
                            <Plus />
                            O'quvchi
                        </Button>
                    </div>
                }
            />
            <DataTable
                columns={columns}
                data={data}
                viewAll
                className="min-w-[700px] md:min-w-0 max-w-full"
                numeration
                selecteds_row
            />

            <Modal modalKey="update" title="Tahrirlash" size="max-w-md">
                <UpdateStudent />
            </Modal>

            <Modal
                modalKey="payment-update"
                title={"To'lov qo'shish"}
            >
                {/* current type error */}
                <PaymentUpdate
                    student_id={store?.student}
                    current={{ group_data: { id: store?.id ?? -1, name: "" } } as GroupStudentPayments}
                    onSuccessPayment={refetchOrg}
                />
            </Modal>


            <AppendStudentModal refetch={refetch} />
            <DeleteModal
                id={store?.id}
                onSuccessAction={() => {
                    remove()
                    invalidateQueries()
                }}
                modalKey="delete-student"
                path={GROUP_STUDENTS}
            />

            <Modal title="Boshqa guruhga ko'chirish" modalKey="export-student" size="max-w-md">
                <ExportStudent onSuccess={refetch} />
            </Modal>
        </div>
    )
}
