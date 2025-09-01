import { DataTable } from "@/components/ui/datatable"
import ParamInput from "@/components/as-params/input"
import { useGet } from "@/hooks/useGet"
import { useSearch } from "@tanstack/react-router"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ParamCombobox } from "@/components/as-params/combobox"
import { formatMoney } from "@/lib/format-money"
import { useLeadTestStudentCols } from "./cols"
import { studentStatusKeys } from "@/pages/students/student-status"


export default function LeadsTestStudents() {
    const params = useSearch({ strict: false })

    const { data: students, isFetching } = useGet<{
        results: GroupStudentTestStudents[]
        total_pages: number
        count: number
    }>("leads/group-added", {
        params: params,
        enabled: !!params.pipeline,
    })

    return (
        <Card>
            <CardContent>
                <DataTable
                    numeration
                    loading={isFetching}
                    columns={useLeadTestStudentCols()}
                    data={students?.results ?? []}
                    wrapperClassName="w-full"
                    paginationProps={{
                        totalPages: students?.total_pages,
                    }}
                    head={
                        <div className="flex mb-3  justify-between items-center gap-3 ">
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl">
                                    Sinovga yozilganlar ro'yxati
                                </h1>
                                <Badge className="text-sm">
                                    {formatMoney(students?.count)}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-3">
                                <div>
                                    <ParamInput />
                                </div>
                                <ParamCombobox
                                    isSearch={false}
                                    options={Array.from({ length: 4 }).map(
                                        (_, index) => ({
                                            id: index,
                                            name: studentStatusKeys[index],
                                        }),
                                    )}
                                    labelKey="name"
                                    valueKey="id"
                                    paramName="status"
                                    label="Holatni tanlang"
                                    className="min-w-[170px]"
                                    addButtonProps={{
                                        className: "min-w-[170px]",
                                    }}
                                />
                            </div>
                        </div>
                    }
                />
            </CardContent>
        </Card>
    )
}
