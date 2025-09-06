import { ParamTabProvider } from "@/components/as-params/tab"
import { TabsContent } from "@/components/ui/tabs"
import { lazy } from "react"
import StudentsAttendanceMain from "../attendance/students"
import EmployeesAttendanceMain from "../attendance/employees"
import LeadsDashboard from "../leads/stats/leads-stats"
import ReportsFilter from "./student-payment/students-filter"


const StudentPayment = lazy(() => import("./student-payment"))

const ReportsMain = () => {


    return (
        <div>
            <ParamTabProvider defaultValue="student_payments">
                <div className="flex  sm:justify-end overflow-x-auto no-scrollbar">
                    <ReportsFilter />
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
                    <TabsContent value="leads_statistic" className="mt-0">
                        <LeadsDashboard />
                    </TabsContent>
                </div>
            </ParamTabProvider>
        </div>
    )
}

export default ReportsMain
