import { DataTable } from "@/components/ui/datatable"
import { useColumns } from "./columns"
import { useGet } from "@/hooks/useGet"
import { STUDENT_GROUP } from "@/constants/api-endpoints"
import { Badge } from "@/components/ui/badge"
import { formatMoney } from "@/lib/format-money"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useCallback, useState } from "react"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import StudentApproHeader from "./group-header"

const StudentAppropriationMain = () => {
    const { id } = useParams({ strict: false }) as { id: string }
    const search: any = useSearch({ strict: false })
    const navigate = useNavigate()
    const [isAll, setIsAll] = useState<boolean>(false)
    const { data, isLoading } = useGet<ListResp<Student>>(STUDENT_GROUP)

    const clickAccordion = useCallback(
        (key: string) => {
            navigate({
                to: "/students/$id/appropriation",
                params: { id },
                search: (prev) => ({
                    ...prev,
                    tab: search.tab === key ? undefined : key,
                }),
            })
        },
        [navigate, id, search.tab],
    )



    return (
        <div className="mt-1">
            <div className="flex  mb-3 flex-row items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium ">
                        {"O'zlashtirish ro'yxati "}
                    </h1>
                    <Badge className="text-sm">
                        {formatMoney(data?.count)}
                    </Badge>
                </div>
                <div className=" flex items-center gap-2 ">
                    <Switch
                        checked={isAll}
                        onCheckedChange={(e) => setIsAll(e)}
                    />
                    <Label>{"Barchasi"}</Label>
                </div>
            </div>

            {!isAll ? (
                <div>
                    <div className="grid grid-cols-3 px-3  border-b py-3 mb-2 bg-muted rounded-md  text-muted-foreground text-sm">
                        <p>Guruh nomi</p>
                        <p>O'rtacha imtihon balli</p>
                        <p>Topshiriqlar balli</p>
                    </div>
                    {data?.results?.map((item, index) => (
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            value={search?.tab ?? undefined}
                            onValueChange={(val) => {
                                clickAccordion(val)
                            }}
                        >
                            <AccordionItem value={item?.id?.toString()}>
                                <AccordionTrigger className="px-3">
                                    <StudentApproHeader
                                        data={item}
                                        key={index}
                                    />
                                </AccordionTrigger>
                                <AccordionContent className="flex   flex-col gap-4 text-balance pl-3">
                                    <StudentTable
                                        data={data?.results}
                                        isLoading={isLoading}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            ) : (
                <StudentTable data={data?.results || []} isLoading={isLoading} />
            )}
        </div>
    )
}

export default StudentAppropriationMain

type PropsTable = {
    isLoading: boolean
    data: Student[]
}

const StudentTable = ({ data, isLoading }: PropsTable) => {
    const columns = useColumns()
    return (
        <div className="mt-1">
            <DataTable
                columns={columns}
                data={data}
                loading={isLoading}
                numeration
            />
        </div>
    )
}
