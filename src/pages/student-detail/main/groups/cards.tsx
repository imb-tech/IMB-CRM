import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Calendar,
    CreditCard,
    Layers,
    Clock,
    Trash,
    RefreshCcw,
    UserPlus,
    MapPin,
    User,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useNavigate } from "@tanstack/react-router"
import { formatMoney } from "@/lib/format-money"
import { daysMap } from "@/lib/shift-groupped"
import { StatusPopoverStudent } from "./status-update"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

type Props = {
    item: Student
    onDelete: (item: Student) => void
}

export function ColorfulCourseCard({ item, onDelete }: Props) {
    const navigate = useNavigate()

    const {
        id,
        balance,
        shifts_data,
        allowed_statuses,
        payment_date,
        status,
        start_date: joinedDate,
        deleted_at,
        activated_date,
        group_data: { name, start_date, end_date, teacher, branch },
    } = item

    const infoItems = [
        {
            icon: <Calendar className="w-4 h-4 text-blue-500" />,
            label: "Dars kunlari",
            value: shifts_data?.map((d) => daysMap[d.day_of_week]).join(", "),
        },
        {
            icon: <UserPlus size={16} className="text-indigo-500" />,
            label: "Qo'shilgan sana:",
            value: joinedDate,
        },
        {
            icon: <RefreshCcw size={16} className="text-purple-500" />,
            label: "Aktivlashtirilgan sana:",
            value: activated_date,
        },
        {
            icon: <CreditCard size={16} className="text-green-500" />,
            label: "Keyingi to'lov:",
            value: payment_date,
        },
    ]
    const infoItemsAccordion = [
        {
            icon: <MapPin size={16} className="text-rose-500" />,
            label: "Filial:",
            value: branch,
        },
        {
            icon: <User size={16} className="text-yellow-600" />,
            label: "O'qituvchi:",
            value: teacher,
        },
        {
            icon: <Clock size={16} className="text-orange-500" />,
            label: "Davomiyligi:",
            value: `${start_date} - ${end_date}`,
        },
        {
            icon: <Trash size={16} className="text-red-500" />,
            label: "O'chirilgan sana:",
            value: format(deleted_at, "yyyy-MM-dd HH:mm"),
        },
    ]

    return (
        <Card className="overflow-hidden border-0 shadow bg-muted">
            <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Layers className="w-5 h-5 text-primary" />
                        </div>
                        <h3
                            onClick={() =>
                                navigate({
                                    to: "/groups/$id",
                                    params: { id: String(id) },
                                })
                            }
                            className="text-lg font-semibold cursor-pointer capitalize hover:underline hover:text-primary"
                        >
                            {name}
                        </h3>
                    </div>
                    <Button
                        onClick={() => onDelete(item)}
                        variant="destructive"
                        size="sm"
                    >
                        <Trash size={16} />
                    </Button>
                </div>

                <div className="w-full flex items-center justify-between gap-3">
                    <p
                        className={cn(
                            "text-xl font-semibold",
                            Number(balance) < 0 && "text-red-500",
                        )}
                    >
                        {formatMoney(balance)} so'm
                    </p>
                    <StatusPopoverStudent
                        student={item}
                        allowed_statuses={allowed_statuses}
                        status={Number(status)}
                        group={id}
                    />
                </div>

                <ul className="flex flex-col gap-3 bg-card/60 p-3 mt-2 rounded-md text-sm">
                    {infoItems.map(({ icon, label, value }, idx) => (
                        <li
                            key={idx}
                            className="flex justify-between items-center gap-3"
                        >
                            <div className="flex items-center gap-2">
                                {icon}
                                <span>{label}</span>
                            </div>
                            <span>{value}</span>
                        </li>
                    ))}
                </ul>

                <Accordion
                    type="single"
                    collapsible
                    className="w-full border-t pt-1 dark:border-t-zinc-700"
                >
                    <AccordionItem value="1" className="border-none ">
                        <AccordionTrigger className="p-2 hover:bg-primary/5 hover:text-primary">
                            Qo'shimcha ma'lumot
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance pb-0 ">
                            <ul className="flex flex-col gap-3 bg-card/60 p-3 mt-2 rounded-md text-sm">
                                {infoItemsAccordion.map(
                                    ({ icon, label, value }, idx) => (
                                        <li
                                            key={idx}
                                            className="flex justify-between items-center gap-3"
                                        >
                                            <div className="flex items-center gap-2">
                                                {icon}
                                                <span>{label}</span>
                                            </div>
                                            <span>{value}</span>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
