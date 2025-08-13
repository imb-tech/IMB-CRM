import MobileHeaderLinks from "@/components/header/mobile-header-links"
import { Button } from "@/components/ui/button"
import { studentDetailNav } from "@/constants/menu"
import PageLayout from "@/layouts/page-layout"
import StudentProfile from "@/pages/student-detail"
import {
    createFileRoute,
    Outlet,
    useNavigate,
    useParams,
} from "@tanstack/react-router"
import { ArrowLeft, Edit } from "lucide-react"

export const Route = createFileRoute("/_main/students/$id/_main")({
    component: () => {
        const { id } = useParams({ strict: false })
        const items = studentDetailNav(id?.toString() ?? "")
        const navigate = useNavigate()
        return (
            <PageLayout>
                <div className="flex flex-col gap-3 ">
                    <div className="flex justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <Button
                                className="min-w-4"
                                onClick={() => {
                                    navigate({ to: "/students" })
                                }}
                            >
                                <ArrowLeft size={18} />
                            </Button>
                            <h1 className="text-xl font-semibold">
                                {"O'quvchi ma'lumoti"}
                            </h1>
                        </div>
                        <Button>
                            <Edit size={16} />
                        </Button>
                    </div>

                    <StudentProfile />
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
            </PageLayout>
        )
    },
})
