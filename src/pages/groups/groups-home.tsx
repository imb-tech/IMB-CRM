import { ParamTabProvider } from "@/components/as-params/tab"
import { TabsContent } from "@/components/ui/tabs"
import { lazy, Suspense } from "react"

const Groups = lazy(() => import("./index"))
const RoomsMain = lazy(() => import("@/pages/settings/rooms"))
const CoursesMain = lazy(() => import("@/pages/settings/courses"))

const GroupsMain = () => {
    return (
        <Suspense fallback={""}>
            <ParamTabProvider defaultValue="groups">
                <div className="mt-2">
                    <TabsContent value="groups" className="mt-0">
                        <Groups />
                    </TabsContent>
                    <TabsContent value="rooms" className="mt-0">
                        <RoomsMain />
                    </TabsContent>
                    <TabsContent value="courses" className="mt-0">
                        <CoursesMain />
                    </TabsContent>
                </div>
            </ParamTabProvider>
        </Suspense>
    )
}

export default GroupsMain
