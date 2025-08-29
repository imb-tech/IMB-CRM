import { DataTable } from "@/components/ui/datatable"
import { useColumns } from "./columns"
import { useGet } from "@/hooks/useGet"
import { SMS_LIST } from "@/constants/api-endpoints"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useParams, useSearch } from "@tanstack/react-router"
import { useCallback } from "react"
import { useModal } from "@/hooks/useModal"
import { formatMoney } from "@/lib/format-money"

const StudentSendMessageMain = () => {
    const { id } = useParams({ from: "/_main/students/$id/_main/send-message" })
    const search = useSearch({ from: "/_main/students/$id/_main/send-message" })
    const { openModal } = useModal("message-add")

    const { data, isLoading } = useGet<ListResp<SendMessage>>(SMS_LIST, {
        params: { ...search, student: id },
        options: { enabled: !!id },
    })

    const handleAddNotes = useCallback(() => {
        openModal()
    }, [openModal])

    const columns = useColumns()
    return (
        <div className="mt-1">
            <div className="flex  mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium ">
                        {" "}
                        {"SMS xabarlar ro'yxati"}
                    </h1>
                    <Badge className="text-sm">{formatMoney(data?.count)}</Badge>
                </div>
                <Button
                    type="button"
                    onClick={handleAddNotes}
                    className="flex gap-1"
                >
                    <Send className="w-4 h-4" />
                    <span className="sm:block hidden">
                        {"SMS xabar yuborish"}
                    </span>
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={data?.results}
                loading={isLoading}
                numeration
                viewAll
            />
        </div>
    )
}

export default StudentSendMessageMain
