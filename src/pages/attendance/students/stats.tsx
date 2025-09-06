import { Card, CardContent } from "@/components/ui/card"
import useQueryParams from "@/hooks/use-query-params"
import { useModal } from "@/hooks/useModal"
import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"

type Props = {
    cards: MainCards | undefined
}
export default function StudentAttendance({ cards }: Props) {
    const search = useSearch({ from: "/_main/reports" })
    const navigate = useNavigate()
    const { closeModal } = useModal("attendance-modal")
    const { toggleParam } = useQueryParams()
    const { tabs, group, group_student, page, page_size, ...res } = search

    const data = [
        {
            id: "1",
            label: "Darsga qatnashishlar",
            data: formatMoney(cards?.present),
        },
        {
            id: "-1",
            label: "Dars qoldirishlar",
            data: formatMoney(cards?.absent),
        },
        { id: "2", label: "Kechikishlar", data: formatMoney(cards?.late) },
        {
            id: "0",
            label: "Qilinmagan davomatlar",
            data: formatMoney(cards?.unmarked),
        },
    ]

    const handleAttendanceModal = (id: string) => {
        if (id) {
            toggleParam("status", id)
            closeModal()
            navigate({
                to: "/attendance/statics",
                search: {
                    ...res,
                    status: id,
                },
            })
        }
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {data?.map((d, i) => (
                <Card
                    key={i}
                    className="bg-secondary hover:scale-[102%] transition-all"
                    onClick={() => handleAttendanceModal(d.id)}
                >
                    <CardContent
                        className={cn(
                            "flex flex-col-reverse items-center py-5 rounded-md cursor-pointer",
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
