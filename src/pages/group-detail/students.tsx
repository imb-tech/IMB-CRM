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
import { ParamMultiCombobox } from "@/components/as-params/multi-combobox"
import { studentStatusKeys } from "../students/student-status"
import UpdateStudent from "./update-student"
import DeleteModal from "@/components/custom/delete-modal"
import { useStore } from "@/hooks/use-store"
import AppendStudentModal from "./append-student-modal"

export default function GroupStudents() {
    const { id: group } = useParams({
        from: "/_main/groups/$id/_main/students",
    })
    const search = useSearch({ from: "/_main/groups/$id/_main/students" })
    const { openModal } = useModal("append-student")
    const { store, remove } = useStore<GroupStudent>("student-data")

    const { data, refetch } = useGet<GroupStudent[]>(GROUP_STUDENTS, {
        params: { group, ...search },
        options: { queryKey: [GROUP_STUDENTS, search] },
    })

    const columns = useGroupStudentCols()

    return (
        <div>
            <SectionHeader
                title="Guruhdagi o'quvchilar"
                rightComponent={
                    <div className="flex items-center gap-1">
                        <ParamMultiCombobox
                            label="Holati"
                            className="w-36"
                            options={Object.entries(studentStatusKeys)?.map(
                                ([k, v]) => ({
                                    id: k,
                                    name: v,
                                }),
                            )}
                            labelKey="name"
                            valueKey="id"
                            paramName="status"
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
                className="max-w-full"
                numeration
                selecteds_row
            />

            <Modal modalKey="update" title="Tahrirlash" size="max-w-md">
                <UpdateStudent />
            </Modal>

            <AppendStudentModal refetch={refetch} />
            <DeleteModal
                id={store?.id}
                onSuccessAction={remove}
                modalKey="delete-student"
                path="platform/group-students"
            />
        </div>
    )
}
