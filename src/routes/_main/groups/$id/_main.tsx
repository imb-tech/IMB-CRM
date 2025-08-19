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
                <div className="flex flex-col gap-3 h-full overflow-y-auto">
                    <div className="w-full flex flex-col gap-2">
                        <GroupProfile />
                    </div>
                    <div className="h-full">
                        <div className="bg-card p-3 rounded-md h-full">
                            <MobileHeaderLinks
                                defaultLinks={items}
                                activeClassname="!text-primary"
                                // navOnHeader={navOnHeader}
                            />
                            <div className="pt-2 px-1 h-full">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayout>
        )
    },
})
