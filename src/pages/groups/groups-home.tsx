import ParamTabList, { ParamTabProvider } from "@/components/as-params/tab"
import { TabsContent } from "@/components/ui/tabs"
import { lazy } from "react"

const Groups = lazy(() => import("./index"))
const RoomsMain = lazy(() => import("@/pages/settings/rooms"))
const CoursesMain = lazy(() => import("@/pages/settings/courses"))

const options = [
    {
        id: "groups",
        name: "Guruhlar",
    },
    {
        id: "rooms",
        name: "Xonalar",
    },
    {
        id: "courses",
        name: "Kurslar",
    },
]

const GroupsMain = () => {
    return (
        <div>
            {/* <ParamTabs options={options} /> */}
            <ParamTabProvider defaultValue="groups">
                {/* <ParamTabList
                    options={options}
                    listClassName="dark:bg-secondary"
                /> */}
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
        </div>
    )
}

export default GroupsMain
