import ParamTabList, { ParamTabProvider } from "@/components/as-params/tab"
import { TabsContent } from "@/components/ui/tabs"
import { lazy } from "react"
import ReportsFilter from "./student-payment/students-filter"

const StudentPayment = lazy(() => import("./student-payment"))

const ReportsMain = () => {
    const options = [
        {
            id: "student_payments",
            name: "O'quvchilar to'lovi",
        },
        {
            id: "2",
            name: "2",
        },
        {
            id: "3",
            name: "3",
        },
        {
            id: "4",
            name: "4",
        },
    ]

    return (
        <div>
            {/* <ParamTabs options={options} /> */}
            <ParamTabProvider defaultValue="student_payments">
                <div className="flex items-center justify-between">
                    <ParamTabList options={options} listClassName="dark:bg-secondary" />
                    <ReportsFilter />
                </div>
                <div className="mt-2">
                    <TabsContent value="student_payments" className="mt-0">
                        <StudentPayment />
                    </TabsContent>
                </div>
            </ParamTabProvider>
        </div>
    )
}

export default ReportsMain
