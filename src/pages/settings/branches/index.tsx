import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { Plus } from "lucide-react"
import { useBranchesCols } from "./columns"
import { Badge } from "@/components/ui/badge"

const BranchesMain = () => {
    const columns = useBranchesCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <div className="flex  justify-between items-center gap-3 ">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl">Filiallar</h1>
                            <Badge variant={"outline"} className="text-sm">
                                {data.length}
                            </Badge>
                        </div>
                        <Button>
                            <Plus className="h-4 w-4" />
                            Qo'shish
                        </Button>
                    </div>
                    <DataTable
                        onDelete={() => {}}
                        onEdit={() => {}}
                        columns={columns}
                        data={data}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default BranchesMain

const data: Branch[] = [
    {
        id: 1,
        name: "Main Office",
        work_start_date: "2022-01-01",
        work_end_date: "2025-01-01",
    },
    {
        id: 2,
        name: "North Branch",
        work_start_date: "2022-03-10",
        work_end_date: "2025-03-10",
    },
    {
        id: 3,
        name: "South Branch",
        work_start_date: "2021-05-15",
        work_end_date: "2024-05-15",
    },
    {
        id: 4,
        name: "East Branch",
        work_start_date: "2020-07-20",
        work_end_date: "2023-07-20",
    },
    {
        id: 5,
        name: "West Branch",
        work_start_date: "2023-01-05",
        work_end_date: "2026-01-05",
    },
    {
        id: 6,
        name: "City Center",
        work_start_date: "2022-11-01",
        work_end_date: "2025-11-01",
    },
    {
        id: 7,
        name: "Downtown",
        work_start_date: "2021-09-10",
        work_end_date: "2024-09-10",
    },
    {
        id: 8,
        name: "Uptown",
        work_start_date: "2020-12-25",
        work_end_date: "2023-12-25",
    },
    {
        id: 9,
        name: "Tech Park",
        work_start_date: "2022-02-14",
        work_end_date: "2025-02-14",
    },
    {
        id: 10,
        name: "Industrial Zone",
        work_start_date: "2021-04-01",
        work_end_date: "2024-04-01",
    },
    {
        id: 11,
        name: "Airport Branch",
        work_start_date: "2023-06-01",
        work_end_date: "2026-06-01",
    },
    {
        id: 12,
        name: "Train Station",
        work_start_date: "2022-08-08",
        work_end_date: "2025-08-08",
    },
    {
        id: 13,
        name: "Harbor Office",
        work_start_date: "2021-10-30",
        work_end_date: "2024-10-30",
    },
    {
        id: 14,
        name: "Mountain View",
        work_start_date: "2023-03-03",
        work_end_date: "2026-03-03",
    },
    {
        id: 15,
        name: "Lakeside",
        work_start_date: "2020-06-06",
        work_end_date: "2023-06-06",
    },
    {
        id: 16,
        name: "Greenfield",
        work_start_date: "2021-07-17",
        work_end_date: "2024-07-17",
    },
    {
        id: 17,
        name: "Riverbank",
        work_start_date: "2022-05-22",
        work_end_date: "2025-05-22",
    },
    {
        id: 18,
        name: "Market Square",
        work_start_date: "2023-09-09",
        work_end_date: "2026-09-09",
    },
    {
        id: 19,
        name: "University",
        work_start_date: "2020-10-10",
        work_end_date: "2023-10-10",
    },
    {
        id: 20,
        name: "City Hall",
        work_start_date: "2022-12-12",
        work_end_date: "2025-12-12",
    },
    {
        id: 21,
        name: "Medical Center",
        work_start_date: "2021-01-20",
        work_end_date: "2024-01-20",
    },
    {
        id: 22,
        name: "Innovation Hub",
        work_start_date: "2023-04-04",
        work_end_date: "2026-04-04",
    },
    {
        id: 23,
        name: "Financial District",
        work_start_date: "2020-02-02",
        work_end_date: "2023-02-02",
    },
    {
        id: 24,
        name: "Old Town",
        work_start_date: "2021-06-16",
        work_end_date: "2024-06-16",
    },
    {
        id: 25,
        name: "New Heights",
        work_start_date: "2022-09-30",
        work_end_date: "2025-09-30",
    },
]
