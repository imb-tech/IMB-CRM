import { DataTable } from "@/components/ui/datatable"
import { useColumns } from "./columns"
import { useGet } from "@/hooks/useGet"
import { COURSE } from "@/constants/api-endpoints"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type Props = {}

function StudentGroupMain({}: Props) {
    const { data, isFetching } = useGet<ListResp<Course>>(COURSE)

    const columns = useColumns()
    return (
        <div className="mt-4">
            <div className="flex  mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium ">
                        {"Guruhlar ro'yxati"}
                    </h1>
                    <Badge className="text-sm">1</Badge>
                </div>
                <Button variant={"secondary"} className="flex gap-1">
                    <Plus className="w-5 h-5" />
                    <span className="sm:block hidden">{"Guruhga qo'shish"}</span>
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={data?.results}
                loading={isFetching}
                numeration
                viewAll
            />
        </div>
    )
}

export default StudentGroupMain

const groupsData = [
    {
        id: 1,
        name: "Group A (Advanced Math)",
        startDate: "2023-09-01",
        endDate: "2024-08-31",
        performance: "Excellent",
        paymentStatus: "Paid",
        balance: "$0.00",
        status: "Active",
    },
    {
        id: 2,
        name: "Group B (Physics Basics)",
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        performance: "Good",
        paymentStatus: "Paid",
        balance: "$0.00",
        status: "Active",
    },
    {
        id: 3,
        name: "Group C (Archived History)",
        startDate: "2022-03-01",
        endDate: "2022-12-31",
        performance: "Average",
        paymentStatus: "Paid",
        balance: "$0.00",
        status: "Archived",
    },
    {
        id: 4,
        name: "Group D (Pending Payment)",
        startDate: "2024-07-01",
        endDate: "2024-12-31",
        performance: "N/A",
        paymentStatus: "Pending",
        balance: "$250.00",
        status: "Active",
    },
]
