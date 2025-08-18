import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function StudentAttendance() {
    const data = [
        {
            label: "Darsga qatnashishlar",
            data: 120,
        },
        {
            label: "Dars qoldirishlar",
            data: 120,
        },
        {
            label: "Kechikishlar",
            data: 120,
        },
        {
            label: "Qilinmagan davomatlar",
            data: 120,
        },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {data.map((d, i) => (
                <Card key={i} className="bg-secondary">
                    <CardContent
                        className={cn("flex flex-col-reverse items-center py-5 rounded-md")}
                    >
                        <p className="text-xl">{d.label}</p>
                        <p
                            className={cn(
                                i == 0 ? "text-primary"
                                : i == 1 ? "text-rose-500"
                                : i == 2 ? "text-orange-400"
                                : "text-muted-foreground",
                                "text-3xl font-semibold"
                            )}
                        >
                            {d.data}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
