import { DataTable } from "@/components/ui/datatable"
import { useGroupStudentCols } from "./cols"
import StatusBadge from "@/components/elements/status-badge"
import Money from "@/components/elements/money"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatPhoneNumber } from "@/lib/format-phone-number"
import ActionDropdown from "@/components/elements/action-dropdown"
import { useIsMobile } from "@/hooks/use-mobile"
import SectionHeader from "@/components/elements/section-header"
import { Button } from "@/components/ui/button"
import { Phone, Plus, Wallet } from "lucide-react"
import { useGet } from "@/hooks/useGet"
import { GROUP_STUDENTS } from "@/constants/api-endpoints"
import { useParams, useSearch } from "@tanstack/react-router"
import AppendStudent from "./append-student"
import Modal from "@/components/custom/modal"
import { useModal } from "@/hooks/useModal"
import ParamInput from "@/components/as-params/input"
import { ParamMultiCombobox } from "@/components/as-params/multi-combobox"
import { studentStatusKeys } from "../students/student-status"
import { useState } from "react"
import UpdateStudent from "./update-student"

export default function GroupStudents() {
    const isMobile = useIsMobile()
    const { id: group } = useParams({
        from: "/_main/groups/$id/_main/students",
    })
    const search = useSearch({ from: "/_main/groups/$id/_main/students" })
    const { openModal } = useModal("append-student")
    const { openModal: updateOpen } = useModal("update")
    const [current, setCurrent] = useState<GroupStudent>()

    const { data, refetch } = useGet<ListResp<GroupStudent>>(GROUP_STUDENTS, {
        params: { group, ...search },
        options: { queryKey: [GROUP_STUDENTS, search] },
    })

    console.log(search)

    const columns = useGroupStudentCols()

    return (
        <div>
            <SectionHeader
                title="Guruhdagi o'quvchilar"
                rightComponent={
                    <div className="flex items-center gap-1">
                        <ParamMultiCombobox
                            label="Holati"
                            className="w-36"
                            options={Object.entries(studentStatusKeys)?.map(
                                ([k, v]) => ({
                                    id: k,
                                    name: v,
                                }),
                            )}
                            labelKey="name"
                            valueKey="id"
                            paramName="status"
                            hideSeach
                        />
                        <ParamInput />
                        <Button variant="secondary" onClick={openModal}>
                            <Plus />
                            Qo'shish
                        </Button>
                    </div>
                }
            />
            {isMobile ?
                <div className="flex flex-col gap-2">
                    {data?.results.map((student) => (
                        <Card
                            key={student.id}
                            className="border-0 shadow-sm bg-secondary"
                        >
                            <CardHeader className="pb-0">
                                <div className="flex items-center">
                                    <h3 className="text-lg font-medium text-primary flex-1">
                                        {student.student_name}
                                    </h3>
                                    <p className="font-medium">
                                        <StatusBadge status={1} />
                                    </p>
                                    <ActionDropdown />
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Telefon
                                            </p>
                                            <p className="font-medium">
                                                {formatPhoneNumber(
                                                    student.student_phone,
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background">
                                            <Wallet className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Balans
                                            </p>
                                            <p className="font-medium">
                                                <Money
                                                    value={Number(
                                                        student.balance,
                                                    )}
                                                    suffix
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            :   <DataTable
                    columns={columns}
                    data={data?.results}
                    viewAll
                    className="max-w-full"
                    onEdit={({ original }) => {
                        setCurrent(original)
                        updateOpen()
                    }}
                />
            }

            <Modal modalKey="update" title="Tahrirlash" size="max-w-md">
                <UpdateStudent current={current} />
            </Modal>

            <Modal modalKey="append-student" title="O'quvchi qo'shish">
                <AppendStudent onSuccess={refetch} />
            </Modal>
        </div>
    )
}
