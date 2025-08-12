import MobileHeaderLinks from "@/components/header/mobile-header-links"
import { studentDetailNav } from "@/constants/menu"
import PageLayout from "@/layouts/page-layout"
import StudentProfile from "@/pages/student-detail"
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/students/$id/_main")({
    component: () => {
        const { id } = useParams({ strict: false })
        const items = studentDetailNav(id?.toString() ?? "")
        return (
            <PageLayout items={[]}>
                <div className="flex flex-col gap-3 h-screen">
                    <StudentProfile />
                    <div className="max-w-full min-h-full pb-16 col-span-2">
                        <div className="bg-card p-3 rounded-md">
                            <MobileHeaderLinks defaultLinks={items} />
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
