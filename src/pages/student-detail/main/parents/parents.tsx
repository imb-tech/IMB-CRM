import { DataTable } from "@/components/ui/datatable"
import { useColumns } from "./columns"
import { useGet } from "@/hooks/useGet"
import { COURSE } from "@/constants/api-endpoints"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type Props = {}

function StudentParentsMain({}: Props) {
    const { data, isFetching } = useGet<ListResp<ParentStudent>>(COURSE)

    const columns = useColumns()

    return (
        <div className="mt-1">
            <div className="flex  mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium ">{"Ota-Ona"}</h1>
                    <Badge className="text-sm">1</Badge>
                </div>
                <Button className="flex gap-1">
                    <Plus className="w-5 h-5" />
                    <span className="sm:block hidden">{"Qo'shish"}</span>
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={parents}
                loading={isFetching}
                onEdit={() => {}}
                onDelete={() => {}}
                numeration
                viewAll
            />
        </div>
    )
}

export default StudentParentsMain

const parents: ParentStudent[] = [
    {
        id: 1,
        full_name: "Ali Karimov (Ota)",
        phone: "+998 90 123 45 67",
        username: "ota",
    },
    {
        id: 2,
        full_name: "Dilnoza Karimova (Ona)",
        phone: "+998 91 234 56 78",
        username: "ona",
    },
    {
        id: 3,
        full_name: "Bekzod Tursunov (Ota)",
        phone: "+998 93 345 67 89",
        username: "ota",
    },
    {
        id: 4,
        full_name: "Malika Tursunova (Ona)",
        phone: "+998 94 456 78 90",
        username: "ona",
    },
    {
        id: 5,
        full_name: "Javlon Qodirov (Ota)",
        phone: "+998 95 567 89 01",
        username: "ota",
    },
    {
        id: 6,
        full_name: "Nigora Qodirova (Ona)",
        phone: "+998 97 678 90 12",
        username: "ona",
    },
    {
        id: 7,
        full_name: "Sherzod Abdurahmonov (Ota)",
        phone: "+998 88 789 01 23",
        username: "ota",
    },
    {
        id: 8,
        full_name: "Gulbahor Abdurahmonova (Ona)",
        phone: "+998 99 890 12 34",
        username: "ona",
    },
    {
        id: 9,
        full_name: "Rustam Xolmatov (Ota)",
        phone: "+998 33 901 23 45",
        username: "ota",
    },
    {
        id: 10,
        full_name: "Saida Xolmatova (Ona)",
        phone: "+998 77 012 34 56",
        username: "ona",
    },
]
