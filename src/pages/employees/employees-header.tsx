import ParamInput from "@/components/as-params/input"
import ParamTabList, { ParamTabProvider } from "@/components/as-params/tab"
import { Button } from "@/components/ui/button"
import { EMPLOYEE, OPTION_ROLES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useModal } from "@/hooks/useModal"
import { Plus } from "lucide-react"
import { useMemo } from "react"

export default function EmployeesHeader() {
    const { data } = useGet<RoleOption[]>(OPTION_ROLES)
    const { openModal } = useModal(`${EMPLOYEE}-add`)

    const options = useMemo(() => {
        const usersCount =
            data?.reduce((acc, curr) => acc + curr.employees_count, 0) ?? 0
        return [
            {
                id: "all",
                name: `Barchasi ${usersCount > 0 ? "(" + usersCount + ")" : ""}`,
            },
            ...(data ?? [])?.map((usr) => ({
                id: usr.id,
                name: `${usr.name} ${usr.employees_count > 0 ? "(" + usr.employees_count + ")" : ""}`,
            })),
        ]
    }, [data])

    return (
        <ParamTabProvider defaultValue={"all"} paramName="role">
            <div className="flex items-start justify-between flex-col md:flex-row gap-2">
                <ParamTabList options={options} />
                <div className="flex items-start gap-2 w-full justify-end">
                    <div className="w-full md:w-[240px]">
                        <ParamInput
                            className="h-10 shadow-none border-none px-3"
                            fullWidth
                        />
                    </div>
                    <Button className="!h-10" onClick={openModal}>
                        <Plus className="h-4 w-4" />
                        Qo'shish
                    </Button>
                </div>
            </div>
        </ParamTabProvider>
    )
}
