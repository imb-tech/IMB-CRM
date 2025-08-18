import StudentPaymentsNumber from "./dashboard"
import { DataTable } from "@/components/ui/datatable"
import { useCols } from "./cols"

export default function StudentPayment() {
    return (
        <div>
            <StudentPaymentsNumber />

            <DataTable
                data={[{ id: 1 }]}
                columns={useCols()}
                numeration
                viewAll
                wrapperClassName="[&_thead]:bg-background mt-4"
            />
        </div>
    )
}
