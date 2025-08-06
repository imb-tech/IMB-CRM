import { studentDetailNav } from "@/constants/menu"
import PageLayout from "@/layouts/page-layout"
import StudentCard from "@/pages/student-detail/student-card"
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/students/$id/_main")({
    component: () => {
        const { id } = useParams({ strict: false })
        const items = studentDetailNav(id?.toString() ?? "")
        return (
            <PageLayout items={items}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="max-w-full pb-16  col-span-2">
                        <div className="bg-background p-3 rounded-md">
                            <Outlet />
                        </div>
                    </div>
                    <div>
                        <StudentCard />
                    </div>
                </div>
            </PageLayout>
        )
    },
})
