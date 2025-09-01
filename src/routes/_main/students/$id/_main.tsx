import DeleteModal from "@/components/custom/delete-modal"
import MobileHeaderLinks from "@/components/header/mobile-header-links"
import { Button } from "@/components/ui/button"
import { STUDENT } from "@/constants/api-endpoints"
import { studentDetailNav } from "@/constants/menu"
import { useStore } from "@/hooks/use-store"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import PageLayout from "@/layouts/page-layout"
import StudentProfile from "@/pages/student-detail"
import {
    createFileRoute,
    Outlet,
    useNavigate,
    useParams,
} from "@tanstack/react-router"
import { ArrowLeft, Edit, Trash } from "lucide-react"

export const Route = createFileRoute("/_main/students/$id/_main")({
    component: () => {
        const { openModal } = useModal(`${STUDENT}-add`)
        const { openModal: openModalDelete } = useModal(`${STUDENT}-delete`)
        const { setStore } = useStore<Student | null>("student")
        const { id } = useParams({ from: "/_main/students/$id" })
        const { data } = useGet<Student>(`${STUDENT}/${id}`, {
            options: { enabled: !!id },
        })
        const items = studentDetailNav(id?.toString() ?? "")
        const navigate = useNavigate()
        return (
            <PageLayout>
                <div className="flex flex-col gap-3 ">
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center gap-3 w-full">
                            <Button
                                className="min-w-4"
                                onClick={() => {
                                    navigate({ to: "/students" })
                                }}
                            >
                                <ArrowLeft size={18} />
                            </Button>
                            <h1 className="sm:text-xl text-lg font-semibold">
                                {"O'quvchi ma'lumoti"}
                            </h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                onClick={() => {
                                    if (data?.id) {
                                        openModal()
                                        setStore(data)
                                    }
                                }}
                            >
                                <Edit size={16} />
                            </Button>
                            <Button
                                variant={"destructive"}
                                type="button"
                                onClick={() => {
                                    if (data?.id) {
                                        openModalDelete()
                                        setStore(data)
                                    }
                                }}
                            >
                                <Trash size={16} />
                            </Button>
                        </div>
                    </div>

                    <StudentProfile data={data} />
                    <div className="max-w-full   col-span-2">
                        <div className="bg-card p-3 rounded-md">
                            <MobileHeaderLinks
                                defaultLinks={items}
                                classNameLink={"bg-muted"}
                            />
                            <div className="pt-2 px-1">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>

                <DeleteModal
                    modalKey={`${STUDENT}-delete`}
                    id={data?.id}
                    path={STUDENT}
                    url="/students"
                />
            </PageLayout>
        )
    },
})
