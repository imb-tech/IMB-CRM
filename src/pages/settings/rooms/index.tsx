import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/datatable"
import { Plus } from "lucide-react"
import { useRoomsCols } from "./columns"
import { Badge } from "@/components/ui/badge"

const RoomsMain = () => {
    const columns = useRoomsCols()
    return (
        <div className="w-full">
            <Card className="mb-5 rounded-lg ">
                <CardContent className="space-y-4">
                    <div className="flex  justify-between items-center gap-3 ">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl">Xonalar</h1>
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

export default RoomsMain

const data: Room[] = [
    { id: 1, name: "Buxgalteriya", branch: "Toshkent" },
    { id: 2, name: "Kadrlar bo‘limi", branch: "Toshkent" },
    { id: 3, name: "Marketing", branch: "Toshkent" },
    { id: 4, name: "IT bo‘limi", branch: "Toshkent" },
    { id: 5, name: "Moliyaviy nazorat", branch: "Toshkent" },

    { id: 6, name: "Buxgalteriya", branch: "Samarqand" },
    { id: 7, name: "Kadrlar bo‘limi", branch: "Samarqand" },
    { id: 8, name: "Marketing", branch: "Samarqand" },
    { id: 9, name: "IT bo‘limi", branch: "Samarqand" },
    { id: 10, name: "Moliyaviy nazorat", branch: "Samarqand" },

    { id: 11, name: "Buxgalteriya", branch: "Andijon" },
    { id: 12, name: "Kadrlar bo‘limi", branch: "Andijon" },
    { id: 13, name: "Marketing", branch: "Andijon" },
    { id: 14, name: "IT bo‘limi", branch: "Andijon" },
    { id: 15, name: "Moliyaviy nazorat", branch: "Andijon" },

    { id: 16, name: "Buxgalteriya", branch: "Farg‘ona" },
    { id: 17, name: "Kadrlar bo‘limi", branch: "Farg‘ona" },
    { id: 18, name: "Marketing", branch: "Farg‘ona" },
    { id: 19, name: "IT bo‘limi", branch: "Farg‘ona" },
    { id: 20, name: "Moliyaviy nazorat", branch: "Farg‘ona" },

    { id: 21, name: "Xavfsizlik", branch: "Toshkent" },
    { id: 22, name: "Xavfsizlik", branch: "Samarqand" },
    { id: 23, name: "Xavfsizlik", branch: "Andijon" },
    { id: 24, name: "Xavfsizlik", branch: "Farg‘ona" },
    { id: 25, name: "Yuridik bo‘lim", branch: "Toshkent" },
]
