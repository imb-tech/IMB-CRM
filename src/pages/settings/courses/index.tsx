import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { useCoursesCols } from "./columns"
import DeleteModal from "@/components/custom/delete-modal"
import { useModal } from "@/hooks/useModal"
import { COURSE } from "@/constants/api-endpoints"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"
import ParamPagination from "@/components/as-params/pagination"
import SettingsHeader from "../settings-header"
import { useStore } from "@/hooks/use-store"

const CoursesMain = () => {
    const { openModal: openModalCourse } = useModal(`${COURSE}-add`)
    const { openModal: openModalDelete } = useModal(`${COURSE}-delete`)
    const { store, setStore, remove } = useStore<Course | null>("courses")

    const params = useSearch({ from: "/_main/groups/" })
    const { data, isFetching } = useGet<ListResp<Course>>(COURSE, { params })

    const handleItemAdd = () => {
        remove()
        openModalCourse()
    }
    const handleItemEdit = (item: Course) => {
        if (item.id) {
            setStore(item)
            openModalCourse()
        }
    }
    const handleItemDelete = (item: Course) => {
        if (item.id) {
            setStore(item)
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
            <DeleteModal
                modalKey={`${COURSE}-delete`}
                id={store?.id}
                path={COURSE}
            />
        </div>
    )
}

export default CoursesMain
