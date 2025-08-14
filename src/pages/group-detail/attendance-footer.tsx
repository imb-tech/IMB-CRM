import { Card, CardContent } from "@/components/ui/card"
import { getStatusColor, getStatusIcon } from "./attendance-select"

export default function AttendanceFooter() {
    return (
        <Card>
            <CardContent className="pt-6 pb-1">
                <div className="flex items-center justify-center flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto transition-colors ${getStatusColor("present")}`}
                        >
                            {getStatusIcon("present")}
                        </div>
                        <span>Keldi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto transition-colors ${getStatusColor("late")}`}
                        >
                            {getStatusIcon("late")}
                        </div>
                        <span>Kech keldi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto transition-colors ${getStatusColor("absent")}`}
                        >
                            {getStatusIcon("absent")}
                        </div>
                        <span>Kelmadi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gray-500/10 rounded-full flex items-center justify-center"></div>
                        <span>Yo'qlama qilinmagan</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
