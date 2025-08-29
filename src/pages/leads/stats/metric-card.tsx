import React from "react"
import { CardContent } from "@/components/ui/card"
import { UserX } from "lucide-react"

interface StageColumnProps {
    stage: LeadsStatus
}

export const StageColumn: React.FC<StageColumnProps> = ({ stage }) => {
    return (
        <div className="min-w-60 max-w-60 relative flex flex-col gap-4 md:gap-3 justify-around">
            <div
                className={`bg-sky-600 text-white py-3 relative`}
                style={{
                    clipPath:
                        "polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)",
                }}
            >
                <div className="text-center px-4">
                    <h2 className="whitespace-nowrap truncate break-all">
                        {stage.name}
                    </h2>
                    <p className="text-base font-semibold truncate break-all">
                        {stage.progress}
                    </p>
                </div>
            </div>

            <CardContent className="bg-red-900/30 border border-red-700/50 rounded  mr-1  p-1">
                <div className=" flex items-center justify-center  text-lg text-red-500 gap-1">
                    <UserX className="size-4 " />
                    <span>{stage.loosed}</span>
                </div>
            </CardContent>
        </div>
    )
}
