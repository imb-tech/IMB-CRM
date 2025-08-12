import { useGet } from "@/hooks/useGet"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import { useCallback } from "react"
import { DataTable } from "@/components/ui/datatable"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { OPTION_ROLES } from "@/constants/api-endpoints"
import { useEmployeeCols } from "./columns"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Props = {
    loading?: boolean
    users?: Employee[]
}

function HrAccordion({ loading, users }: Props) {
    const { id } = useParams({ strict: false }) as { id: string }
    const search = useSearch({ strict: false })
    const navigate = useNavigate()

    const { data } = useGet<RoleOption[]>(OPTION_ROLES)

    const clickAccordion = useCallback(
        (key: string) => {
            navigate({
                to: "/employees/hr",
                params: { id },
                search: (prev) => ({
                    ...prev,
                    role: search.role === key ? undefined : key,
                }),
            })
        },
        [navigate, id, search.role],
    )
    const columns = useEmployeeCols()

    return (
        <div className="overflow-x-auto hidden lg:block">
            <div className="w-full">
                <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-xl font-medium ">
                        {"Hodimlar ro'yxati"}
                    </h1>
                    <Badge className="text-sm">{data?.length}</Badge>
                </div>

                <div className="grid grid-cols-2 px-3 border-b pb-3 text-primary">
                    <p>Rol nomi</p>
                    <p>Xodimlar soni</p>
                </div>

                {data?.map((item, i) => (
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        value={search?.role?.toString() ?? undefined}
                        onValueChange={(val) => {
                            clickAccordion(val)
                        }}
                        key={item.id}
                    >
                        <AccordionItem
                            value={item?.id?.toString()}
                            className={cn(
                                 search?.role === data[i + 1]?.id && "!border-none"
                            )}
                        >
                            <AccordionTrigger>
                                <div className="grid grid-cols-2 w-full text-start px-3">
                                    <p>{item.name}</p>
                                    <p>{item.employees_count}</p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex  flex-col gap-4 text-balance pt-2 pl-2">
                                <DataTable
                                    numeration
                                    columns={columns}
                                    loading={loading}
                                    viewAll
                                    data={users}
                                    skeletonRowCount={2}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </div>
    )
}

export default HrAccordion
