import React from "react"
import { formatMoney } from "@/lib/format-money"
import { CardContent } from "@/components/ui/card"
import { UserX } from "lucide-react"

interface StageColumnProps {
    stage: LeadsStatus
}

export const StageColumn: React.FC<StageColumnProps> = ({ stage }) => {
    return (
        <div className="min-w-60 max-w-60 relative flex flex-col gap-4 md:gap-0 justify-around">
            <div
                className={`bg-sky-600 text-white px-4 py-5 relative`}
                style={{
                    clipPath:
                        "polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)",
                }}
            >
                <div className="text-center px-4">
                    <h2 className="whitespace-nowrap truncate break-all">
                        {stage.name} ({stage.progress})
                    </h2>
                    <p className="text-base font-semibold truncate break-all">
                        {formatMoney(stage.progress_amount)} {("so'm")}
                    </p>
                </div>
            </div>

            <CardContent className="bg-red-900/30 border border-red-700/50 rounded  mr-1  p-2">
                <div className=" flex items-center justify-center  text-lg text-red-500 gap-1">
                    <UserX className="size-5 " />
                    <span>{stage.loosed}</span>
                    <span className="mx-1">/</span>
                    <span>-${formatMoney(stage.loose_amount)}</span>
                </div>
            </CardContent>
        </div>
    )
}
