import  { ParamTabProvider } from "@/components/as-params/tab"
import { TabsContent } from "@/components/ui/tabs"
import { lazy } from "react"
import StudentsAttendanceMain from "../attendance/students"
import EmployeesAttendanceMain from "../attendance/employees"

const StudentPayment = lazy(() => import("./student-payment"))

const ReportsMain = () => {

    return (
        <div>
            <ParamTabProvider defaultValue="student_payments">
                <div className="flex items-center justify-between">
                    {/* <ParamTabList
                        options={options}
                        listClassName="dark:bg-secondary"
                    /> */}
                    {/* <ReportsFilter /> */}
                </div>
                <div className="mt-2">
                    <TabsContent value="student_payments" className="mt-0">
                        <StudentPayment />
                    </TabsContent>
                    <TabsContent value="attendance" className="mt-0">
                        <StudentsAttendanceMain />
                    </TabsContent>
                    <TabsContent value="attendance_emp" className="mt-0">
                        <EmployeesAttendanceMain />
                    </TabsContent>
                </div>
            </ParamTabProvider>
        </div>
    )
}

export default ReportsMain
