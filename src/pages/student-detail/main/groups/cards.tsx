import { Card, CardContent } from "@/components/ui/card"
import {
    User,
    MapPin,
    Calendar,
    CreditCard,
    Layers,
    Clock,
    Trash,
} from "lucide-react"
import { daysMap } from "@/lib/shift-groupped"
import { StatusPopoverStudent } from "./status-update"
import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

type Props = {
    item: Student
    onDelete: (item: Student) => void
}

export function ColorfulCourseCard({ item, onDelete }: Props) {
    const navigate = useNavigate()

    const {
        group_data,
        balance,
        shifts_data,
        allowed_statuses,
        payment_date,
        status,
        start_date: start_date_students,
        deleted_at,
        id,
    } = item
    const { start_date, end_date, name, teacher,  branch } = group_data
    return (
        <Card className="overflow-hidden border-0 shadow bg-muted ">
            <CardContent className="space-y-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full ">
                            <Layers className="w-7 h-7 text-primary" />
                        </div>
                        <div className="flex flex-col gap-1 items-start">
                            <h3
                                onClick={() =>
                                    navigate({
                                        to: "/groups/$id",
                                        params: {
                                            id: String(id),
                                        },
                                    })
                                }
                                className="text-xl font-semibold cursor-pointer capitalize hover:underline hover:text-primary"
                            >
                                {name}
                            </h3>
                            <StatusPopoverStudent
                                group={id}
                                allowed_statuses={allowed_statuses}
                                status={Number(status)}
                            />
                        </div>
                    </div>
                    <Button
                        onClick={() => onDelete(item)}
                        variant={"destructive"}
                        size={"sm"}
                    >
                        <Trash size={16} />
                    </Button>
                </div>

                <div>
                    <p
                        className={cn(
                            "text-xl font-semibold",
                            Number(balance) < 0 && "text-red-500",
                        )}
                    >
                        {formatMoney(balance)} so'm
                    </p>
                    <p className="text-xs dark:text-gray-300 ">Joriy balans</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-card/60 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 " />
                            <p className="text-xs font-medium ">O'qituvchi</p>
                        </div>
                        <p className="text-foreground">{teacher}</p>
                    </div>

                    <div className="bg-card/60 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 " />
                            <p className="text-xs font-medium ">Dars kunlari</p>
                        </div>
                        <p className="text-foreground">
                            {shifts_data
                                ?.map((d) => daysMap[d.day_of_week])
                                ?.join(", ")}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-card/60 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4 " />
                            <p className="text-xs font-medium ">Filial</p>
                        </div>
                        <p className=" text-foreground">{branch}</p>
                    </div>

                    <div className="bg-card/60 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <CreditCard className="w-4 h-4 " />
                            <p className="text-xs font-medium ">
                                Keyingi to'lov
                            </p>
                        </div>
                        <p className=" text-foreground">{payment_date}</p>
                    </div>
                </div>

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
                            <ul className="flex flex-col gap-2 bg-card/60 p-3 mt-2 rounded-md">
                                <li className="flex justify-between items-center gap-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock
                                            size={16}
                                            className="text-orange-500"
                                        />
                                        <span>Davomiyligi:</span>
                                    </div>
                                    <span>
                                        {start_date} - {end_date}
                                    </span>
                                </li>
                                <li className="flex justify-between items-center gap-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock
                                            className="text-green-500"
                                            size={16}
                                        />
                                        <span>Qo'shilgan sana:</span>
                                    </div>
                                    <span>{start_date_students}</span>
                                </li>
                                <li className="flex justify-between items-center gap-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Trash
                                            size={16}
                                            className="text-red-500"
                                        />
                                        <span>O'chirilgan sana:</span>
                                    </div>
                                    <span>
                                        {format(deleted_at, "yyyy-MM-dd HH:mm")}
                                    </span>
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
