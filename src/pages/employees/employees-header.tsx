import { ParamCombobox } from "@/components/as-params/combobox"
import ParamInput from "@/components/as-params/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EMPLOYEE, OPTION_ROLES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { useSearch } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { useMemo } from "react"

export default function EmployeesHeader({
    allEmployes,
}: {
    allEmployes?: number
}) {
    const { data } = useGet<RoleOption[]>(OPTION_ROLES)
    const { openModal } = useModal(`${EMPLOYEE}-add`)

    const { role } = useSearch({ strict: false })

    const usersCount =
        data?.reduce((acc, curr) => acc + curr.employees_count, 0) ?? 0

    const options = useMemo(() => {
        return [
            ...(data ?? [])?.map((usr) => ({
                id: usr.id,
                name: `${usr.name} ${usr.employees_count > 0 ? "(" + usr.employees_count + ")" : ""}`,
                count: usr.employees_count,
            })),
        ]
    }, [data])

    return (
        <div className="flex items-center flex-col md:justify-between md:flex-row gap-2 mb-2">
            <div className="flex items-center gap-3">
                <h1 className="text-xl font-medium ">{"Hodimlar ro'yxati"}</h1>
                <Badge className="text-sm">
                    {role ?
                        data?.find((r) => r.id === role)?.employees_count
                    :   allEmployes}
                </Badge>
            </div>
            <div className="flex items-center gap-2 justify-end">
                <div className="w-full md:w-[240px]">
                    <ParamInput
                        className="h-10 shadow-none border-none px-3"
                        fullWidth
                    />
                </div>
                <ParamCombobox
                    options={options}
                    labelKey="name"
                    valueKey="id"
                    paramName="role"
                    label="Rol"
                    isSearch={false}
                    className="!h-10 min-w-[140px]"
                />
                <Button className="!h-10" onClick={openModal}>
                    <Plus className="h-4 w-4" />
                    Yaratish
                </Button>
            </div>
        </div>
    )
}
