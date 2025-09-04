import { Card, CardContent } from "@/components/ui/card"
import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"

type Props = {
    cards: MainCards | undefined
}
export default function StudentAttendance({ cards }: Props) {
    
    const data = [
        {
            label: "Darsga qatnashishlar",
            data: formatMoney(cards?.present),
        },
        {
            label: "Dars qoldirishlar",
            data: formatMoney(cards?.absent),
        },
        {
            label: "Kechikishlar",
            data: formatMoney(cards?.late),
        },
        {
            label: "Qilinmagan davomatlar",
            data: formatMoney(cards?.unmarked),
        },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {data?.map((d, i) => (
                <Card key={i} className="bg-secondary">
                    <CardContent
                        className={cn(
                            "flex flex-col-reverse items-center py-5 rounded-md",
                        )}
                    >
                        <p className="text-xl">{d.label}</p>
                        <p
                            className={cn(
                                i == 0
                                    ? "text-primary"
                                    : i == 1
                                    ? "text-rose-500"
                                    : i == 2
                                    ? "text-orange-400"
                                    : "text-muted-foreground",
                                "text-3xl font-semibold",
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
