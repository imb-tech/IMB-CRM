import MobileHeaderLinks from "@/components/header/mobile-header-links"
import { groupDetailNav } from "@/constants/menu"
import PageLayout from "@/layouts/page-layout"
import GroupProfile from "@/pages/group-detail/group-profile"
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/groups/$id/_main")({
    component: () => {
        const { id } = useParams({ strict: false })
        const items = groupDetailNav(id?.toString() ?? "")
        return (
            <PageLayout items={[]}>
                <div className="flex flex-col gap-3 h-screen">
                    <div className="w-full flex flex-col gap-2">
                        <GroupProfile />
                    </div>
                    <div className="max-w-full min-h-full pb-16 col-span-2">
                        <div className="bg-card p-3 rounded-md">
                            <MobileHeaderLinks
                                defaultLinks={items}
                                // navOnHeader={navOnHeader}
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
