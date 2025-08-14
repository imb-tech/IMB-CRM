import { DataTable } from "@/components/ui/datatable"
import { useColumns } from "./columns"
import { useGet } from "@/hooks/useGet"
import { COURSE } from "@/constants/api-endpoints"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

type Props = {}

const StudentSendMessageMain = (props: Props) => {
    const { data, isFetching } = useGet<ListResp<Course>>(COURSE)

    const columns = useColumns()
    return (
        <div className="mt-1">
            <div className="flex  mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium ">
                        {" "}
                        {"SMS xabarlar ro'yxati"}
                    </h1>
                    <Badge className="text-sm">1</Badge>
                </div>
                <Button className="flex gap-1">
                    <Send className="w-4 h-4" />
                    <span className="sm:block hidden">
                        {"SMS xabar yuborish"}
                    </span>
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

export default StudentSendMessageMain
