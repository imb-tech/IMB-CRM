import { ParamCombobox } from "@/components/as-params/combobox"
import ParamInput from "@/components/as-params/input"
import { ParamMultiCombobox } from "@/components/as-params/multi-combobox"
import { Button } from "@/components/ui/button"
import { OPTION_ROLES } from "@/constants/api-endpoints"
import { useGet } from "@/hooks/useGet"
import { useNavigate } from "@tanstack/react-router"
import { ArrowLeft, Flame, ListCheck } from "lucide-react"
import { getPriorityColor } from "./task-card"
import { cn } from "@/lib/utils"

const options = [
    {
        label: (
            <div className="flex items-center  w-full gap-2">
                <span
                    className={cn(
                        "h-7 w-7 rounded-full flex items-center justify-center",
                        getPriorityColor(1),
                    )}
                >
                    <ListCheck className="w-4 h-4" />
                </span>
                <span>
                    {" "}
                    <span>{"Barchasi"}</span>
                </span>
            </div>
        ),
        key: "",
    },
    {
        label: (
            <div className="flex items-center  w-full gap-2">
                <span
                    className={cn(
                        "h-7 w-7 rounded-full flex items-center justify-center",
                        getPriorityColor(1),
                    )}
                >
                    <Flame className="w-4 h-4" />
                </span>
                <span>
                    {" "}
                    <span>{"Past"}</span>
                </span>
            </div>
        ),
        key: 1,
    },
    {
        label: (
            <div className="flex items-center  w-full gap-2">
                <span
                    className={cn(
                        "h-7 w-7 rounded-full flex items-center justify-center",
                        getPriorityColor(2),
                    )}
                >
                    <Flame className="w-5 h-5" />
                </span>
                <span>
                    {" "}
                    <span>{"O'rta"}</span>
                </span>
            </div>
        ),
        key: 2,
    },
    {
        label: (
            <div className="flex items-center  w-full gap-2">
                <span
                    className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center",
                        getPriorityColor(3),
                    )}
                >
                    <Flame className="w-6 h-6" />
                </span>
                <span>
                    {" "}
                    <span>{"Yuqori"}</span>
                </span>
            </div>
        ),
        key: 3,
    },
]

export default function TaskHeader({
    users,
}: {
    users: FormValues["invited_users"]
}) {
    const navigate = useNavigate()
    const { data: dataPosition } =
        useGet<{ id: number; employees_count: number; name: string }[]>(
            OPTION_ROLES,
        )

    return (
        <div className=" flex overflow-x-auto no-scrollbar-x w-full gap-3 p-1">
            <div className="flex items-center gap-3 w-full">
                <Button
                    className="min-w-4 "
                    variant={"secondary"}
                    onClick={() =>
                        navigate({
                            to: "/project",
                        })
                    }
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <ParamMultiCombobox
                    labelKey="name"
                    valueKey="id"
                    options={dataPosition || []}
                    paramName="role_id"
                    label={"Role"}
                />
            </div>
            <ParamMultiCombobox
                labelKey="full_name"
                valueKey="id"
                options={users || []}
                paramName={"user_id"}
                label={"Xodim"}
                addButtonProps={{
                    className: "min-w-[230px] w-full",
                }}
            />
            <ParamCombobox
                isSearch={false}
                labelKey="label"
                valueKey="key"
                options={options}
                paramName={"priority"}
                label={"Muhimlik darajasi"}
                renderOption={(item) => item.label}
                addButtonProps={{
                    className: "min-w-[230px] w-full ",
                }}
            />
            <ParamInput fullWidth className="min-w-[230px] w-full " />
        </div>
    )
}
