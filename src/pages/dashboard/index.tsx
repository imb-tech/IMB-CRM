
import DashboardCard from "./dashboard-card"
import DashboardCalendar from "./dashboard-calendar"

const DashboardMain = () => {

    return (
        <div className="space-y-4 w-full">
            <DashboardCard />
            <DashboardCalendar />
        </div>
    )
}

export default DashboardMain
