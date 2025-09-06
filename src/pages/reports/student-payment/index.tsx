import StudentPaymentsNumber from "./dashboard"
import { DataTable } from "@/components/ui/datatable"
import { useCols } from "./cols"
import { useSearch } from "@tanstack/react-router"
import { useGet } from "@/hooks/useGet"

export default function StudentPayment() {
    const search = useSearch({ from: "/_main/reports/" })
    const { tabs, ...res } = search

    const { data } = useGet("url", {
        params: res,
    })

    return (
        <div>
            <StudentPaymentsNumber />

            <DataTable
                data={[{ id: 1 }]}
                columns={useCols()}
                numeration
                wrapperClassName="[&_thead]:bg-background mt-4"
            />
        </div>
    )
}
