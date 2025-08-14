import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useCoursesCols } from "./columns"
import Modal from "@/components/custom/modal"
import DeleteModal from "@/components/custom/delete-modal"
import CoursesCreate from "./create"
import { useModal } from "@/hooks/useModal"
import { useState } from "react"
import { COURSE } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import ParamPagination from "@/components/as-params/pagination"
import SettingsHeader from "../settings-header"

const CoursesMain = () => {
    const { openModal: openModalCourse } = useModal(`${COURSE}-add`)
    const { openModal: openModalDelete } = useModal(`${COURSE}-delete`)
    const [current, setCurrent] = useState<Course | null>(null)

    const params = useSearch({ from: "/_main/groups/" })
    const { data, isFetching } = useGet<ListResp<Course>>(COURSE, { params })

    const handleItemAdd = () => {
        setCurrent(null)
        openModalCourse()
    }
    const handleItemEdit = (item: Course) => {
        if (item.id) {
            setCurrent(item)
            openModalCourse()
        }
    }
    const handleItemDelete = (item: Course) => {
        if (item.id) {
            setCurrent(item)
            openModalDelete()
        }
    }

    const columns = useCoursesCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <SettingsHeader
                        dataCount={data?.count}
                        handleAdd={handleItemAdd}
                        pageTitle="Kurslar"
                    />
                    <DataTable
                        onDelete={(row) => handleItemDelete(row.original)}
                        onEdit={(row) => handleItemEdit(row.original)}
                        columns={columns}
                        data={data?.results}
                        loading={isFetching}
                        numeration
                        viewAll
                    />
                    <ParamPagination
                        totalPages={data?.total_pages}
                        changePageSize={false}
                    />
                </CardContent>
            </Card>
            <Modal
                modalKey={`${COURSE}-add`}
                title={`Kurs ${current?.id ? "tahrirlash" : "yaratish"}`}
            >
                <CoursesCreate item={current} />
            </Modal>
            <DeleteModal
                modalKey={`${COURSE}-delete`}
                id={current?.id}
                path={COURSE}
            />
        </div>
    )
}

export default CoursesMain
